import { useEffect, useState } from 'react';
import { useIsPresent, useReducedMotion } from 'framer-motion';
const question = 'Ask about Kenneth...';
export default function TypingPrompt() {
  const reduced = useReducedMotion();
  const present = useIsPresent();
  const [count, setCount] = useState(() => reduced ? question.length : 0);
  useEffect(() => {
    if (reduced || !present) return;
    let length = 0;
    const timer = setInterval(() => {
      length += 1;
      setCount(length);
      if (length >= question.length) clearInterval(timer);
    }, 55);
    return () => clearInterval(timer);
  }, [reduced, present]);
  const text = reduced ? question : question.slice(0, count);
  return <p className="chat-prompt" aria-label={question}><span aria-hidden="true">{text}{text.length < question.length && <span className="chat-typing-caret" />}</span></p>;
}
