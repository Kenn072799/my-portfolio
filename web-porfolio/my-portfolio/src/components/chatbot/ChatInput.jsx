import React, { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;

    onSend(input);
    setInput("");
  };

  return (
    <div className="border-t border-border-default bg-bg-main p-3 flex gap-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        placeholder="Ask about Kenneth..."
        className="flex-1 border border-border-default rounded px-3 py-2 text-sm bg-bg-main text-text-primary placeholder:text-text-muted focus:outline-none"
      />

      <button
        onClick={send}
        className="bg-text-primary text-bg-main px-3 py-2 rounded text-sm hover:opacity-90 transition cursor-pointer"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
