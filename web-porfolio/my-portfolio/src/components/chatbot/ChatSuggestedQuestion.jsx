import React from "react";

const ChatSuggestedQuestion = ({ sendMessage }) => {
  const suggestedQuestions = [
    {
      id: 1,
      question: "What problems does Kenneth like solving?",
      sendingMessage: "What type of problems does Kenneth enjoy solving?",
    },
    {
      id: 2,
      question: "What kind of developer is Kenneth?",
      sendingMessage: "What kind of developer is Kenneth",
    },
    {
      id: 3,
      question: "How does Kenneth build AI apps?",
      sendingMessage: "How does Kenneth approach building AI applications?",
    },
    {
      id: 4,
      question: "What makes Kenneth different?",
      sendingMessage: "What makes Kenneth different from other developers?",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-xs">
      {suggestedQuestions.map((question) => {
        return (
          <button
            key={question.id}
            onClick={() => sendMessage(question.sendingMessage)}
            className="text-sm border border-border-default text-text-secondary px-3 py-1.5 rounded-md hover:bg-bg-muted transition"
          >
            {question.question}
          </button>
        );
      })}
    </div>
  );
};

export default ChatSuggestedQuestion;
