const suggestions = [
  { label: 'Projects', question: 'What has Kenneth built?' },
  { label: 'Experience', question: 'Tell me about Kenneth’s experience.' },
];
export default function ChatSuggestedQuestion({ sendMessage }) {
  return <div className="chat-suggestions">{suggestions.map(({ label, question }) => <button type="button" key={label} onClick={() => sendMessage(question)}>{label}</button>)}</div>;
}
