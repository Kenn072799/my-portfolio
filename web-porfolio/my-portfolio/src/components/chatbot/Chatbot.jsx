import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion as Motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FiMessageSquare } from 'react-icons/fi';
import { sendChatMessage } from '../../api/chatApi';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import TypingPrompt from './TypingPrompt';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [present, setPresent] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const scroll = useRef(null);
  const panel = useRef(null);
  const launcher = useRef(null);
  const restoreFocus = useRef(false);
  const reduced = useReducedMotion();
  const attachPanel = useCallback((node) => {
    panel.current = node;
    if (node) requestAnimationFrame(() => {
      if (panel.current !== node) return;
      const input = node.querySelector('input:not(:disabled)');
      (input || node.querySelector('button'))?.focus({ preventScroll: true });
      scroll.current?.scrollTo({ top: scroll.current.scrollHeight, behavior: 'instant' });
    });
  }, []);
  function close() { setOpen(false); }
  useLayoutEffect(() => {
    if (!present) {
      if (restoreFocus.current) {
        restoreFocus.current = false;
        launcher.current?.focus({ preventScroll: true });
      }
      return;
    }
    const background = document.querySelector('.portfolio-site');
    const wasInert = background?.inert;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const bodyPadding = parseFloat(getComputedStyle(document.body).paddingRight) || 0;
    if (background) background.inert = true;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${bodyPadding + scrollbarWidth}px`;
    function keyboard(event) {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
      if (event.key !== 'Tab') return;
      const controls = panel.current?.querySelectorAll('button:not(:disabled), input:not(:disabled), a[href]');
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      const outside = !panel.current.contains(document.activeElement);
      if (event.shiftKey && (document.activeElement === first || outside)) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || outside)) {
        event.preventDefault(); first.focus();
      }
    }
    document.addEventListener('keydown', keyboard);
    return () => {
      if (background) background.inert = wasInert;
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      document.removeEventListener('keydown', keyboard);
    };
  }, [present]);
  useEffect(() => {
    if (!open) {
      const container = scroll.current;
      container?.scrollTo({ top: container.scrollTop, behavior: 'instant' });
      return;
    }
    scroll.current?.scrollTo({ top: scroll.current.scrollHeight, behavior: reduced ? 'instant' : 'smooth' });
  }, [messages, loading, reduced, open]);
  async function send(text) {
    if (loading || !text.trim()) return;
    setMessages((previous) => [...previous, { role: 'user', content: text.trim() }]);
    setLoading(true);
    try {
      const reply = await sendChatMessage(text.trim());
      setMessages((previous) => [...previous, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((previous) => [...previous, { role: 'assistant', content: 'Unable to connect. Please try again.' }]);
    } finally { setLoading(false); }
  }
  // Commit each Motion opacity frame so the native-animation teardown cannot flash back to 1.
  return <div className="chat-theme">
    <AnimatePresence onExitComplete={() => { restoreFocus.current = true; setPresent(false); }}>
      {open && <Motion.section ref={attachPanel} id="portfolio-assistant" role="dialog" aria-modal="true" aria-labelledby="assistant-title" aria-describedby="chat-dismiss-instructions" className="chat-panel chat-fullscreen" onUpdate={(latest) => { if (panel.current && typeof latest.opacity === "number") panel.current.style.opacity = String(latest.opacity); }} onClick={(event) => { if (!event.target.closest(".chat-composer, .chat-messages")) close(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.2, ease: [0.4, 0, 1, 1] } }} transition={{ duration: reduced ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}>
        <p id="chat-dismiss-instructions" className="sr-only">Click the empty space outside the conversation or press Escape to close.</p>
        <button type="button" className="chat-side-dismiss chat-side-left" aria-label="Close chat" onClick={(event) => { event.stopPropagation(); close(); }} />
        <button type="button" className="chat-side-dismiss chat-side-right" aria-label="Close chat" onClick={(event) => { event.stopPropagation(); close(); }} />
        <header className="chat-header"><h2 id="assistant-title">AI assistant</h2></header>
        <div className={`chat-body ${messages.length === 0 ? "is-empty" : ""}`}>
          {messages.length > 0 && <div className="chat-scroll" ref={scroll}><ChatMessage messages={messages} loading={loading} /></div>}
          <div className="chat-composer">
            {messages.length === 0 && <TypingPrompt />}
            <ChatInput onSend={send} disabled={loading} value={draft} onValueChange={setDraft} />
          </div>
        </div>
      </Motion.section>}
    </AnimatePresence>
    <button ref={launcher} hidden={present} className="chat-launcher" type="button" aria-label="Ask about Kenneth" aria-expanded={present} aria-controls="portfolio-assistant" onClick={() => { setPresent(true); setOpen(true); }}><FiMessageSquare /><span>Ask AI</span></button>
  </div>;
}
