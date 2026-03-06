import React from "react";
import ProfileAvatar from "./ProfileAvatar";

const ChatMessage = ({ messages, loading }) => {
  return (
    <div className="flex-1 py-4 overflow-y-auto space-y-4">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
        >
          {msg.role === "assistant" && (
            <div className="w-8 h-8">
              <ProfileAvatar />
            </div>
          )}

          <div
            className={`rounded-lg px-3 py-2 max-w-[75%] text-sm ${
              msg.role === "assistant"
                ? "bg-bg-card border [&_p]:mb-2 [&_p:last-child]:mb-0 [&_a]:text-accent-main [&_a]:underline [&_a]:break-all"
                : "bg-text-primary text-bg-main"
            }`}
          >
            {msg.role === "assistant" ? (
              <div dangerouslySetInnerHTML={{ __html: msg.content }} />
            ) : (
              msg.content
            )}
          </div>
        </div>
      ))}

      {loading && (
        <p className="text-xs text-text-muted">
          Kenneth Assistant is typing...
        </p>
      )}
    </div>
  );
};

export default ChatMessage;
