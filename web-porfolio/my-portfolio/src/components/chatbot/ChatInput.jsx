import React from "react";

const ChatInput = () => {
  return (
    <div className="border-t p-3 flex items-center gap-2">
      <input
        type="text"
        placeholder="Ask about Kenneth's AI projects..."
        className="flex-1 border border-border-default rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-text-primary"
      />

      <button className="px-3 py-2 text-sm bg-text-primary text-white rounded-md hover:opacity-90 transition">
        Send
      </button>
    </div>
  );
};

export default ChatInput;
