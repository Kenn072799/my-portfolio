import { createElement, Fragment, useMemo } from 'react';
import { safeUrl } from '../../data/portfolio';
const allowed = new Set(['p', 'strong', 'em', 'ul', 'ol', 'li', 'br', 'code', 'pre', 'blockquote']);
function Reply({ content }) {
  // The API returns Markdown rendered to HTML. Rebuild only supported elements,
  // without copying arbitrary HTML attributes into the page.
  const nodes = useMemo(() => {
    const document = new DOMParser().parseFromString(String(content), 'text/html');
    function render(node, key) {
      if (node.nodeType === 3) return node.textContent;
      if (node.nodeType !== 1) return null;
      const tag = node.tagName.toLowerCase();
      if (['script', 'style', 'iframe', 'object', 'svg'].includes(tag)) return null;
      const children = Array.from(node.childNodes).map((child, index) => render(child, `${key}-${index}`));
      if (tag === 'a') {
        const href = safeUrl(node.getAttribute('href'));
        return href ? createElement('a', { key, href, target: '_blank', rel: 'noopener noreferrer' }, children) : createElement(Fragment, { key }, children);
      }
      return createElement(allowed.has(tag) ? tag : Fragment, { key }, tag === 'br' ? undefined : children);
    }
    return Array.from(document.body.childNodes).map((node, index) => render(node, String(index)));
  }, [content]);
  return <div className="chat-reply">{nodes}</div>;
}
export default function ChatMessage({ messages, loading }) {
  return <div className="chat-messages" role="log" aria-live="polite" aria-relevant="additions">{messages.map((message, index) => <div key={index} className={`chat-message ${message.role}`}><span className="sr-only">{message.role === 'user' ? 'You' : 'Assistant'}: </span>{message.role === 'assistant' ? <Reply content={message.content} /> : message.content}</div>)}{loading && <p className="chat-typing" role="status">Thinking…</p>}</div>;
}
