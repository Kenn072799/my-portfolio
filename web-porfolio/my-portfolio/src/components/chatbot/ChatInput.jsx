import { FiArrowUp } from 'react-icons/fi';
export default function ChatInput({ onSend, disabled = false, value, onValueChange }) {
  function submit(event) {
    event.preventDefault();
    if (!value.trim() || disabled) return;
    onSend(value); onValueChange('');
  }
  return <form className="chat-input" onSubmit={submit}><label className="sr-only" htmlFor="assistant-message">Your question for Kenneth’s assistant</label><input id="assistant-message" value={value} onChange={(event) => onValueChange(event.target.value)} disabled={disabled} autoComplete="off" maxLength={2000} /><button type="submit" disabled={disabled || !value.trim()} aria-label="Send message"><FiArrowUp /></button></form>;
}
