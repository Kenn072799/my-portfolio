import React, { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;

    onSend(input);
    setInput("");
  };

  return (
    <div className="border-t p-3 flex gap-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about Kenneth..."
        className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none"
      />

      <button
        onClick={send}
        className="bg-text-primary text-white px-3 py-2 rounded text-sm"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;