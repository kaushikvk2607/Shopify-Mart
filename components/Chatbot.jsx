import { useState } from "react";
import { trackEvent } from "../lib/mixpanel";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const toggleChat = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    trackEvent(newState ? 'Chatbot Opened' : 'Chatbot Closed');
  };

  const sendMessage = async () => {
    if (!input) return;

    trackEvent('Chatbot Message Sent', { message: input });

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    setMessages(prev => [
      ...prev,
      { user: input, bot: data.response || "No response" }
    ]);

    trackEvent('Chatbot Response Received', {
      user_message: input,
      bot_response: data.response || "No response"
    });

    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "#0070f3",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          cursor: "pointer",
          zIndex: 9999
        }}
      >
        💬
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "320px",
            height: "400px",
            background: "white",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#0070f3",
              color: "white",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px"
            }}
          >
            <span>Medical Assistant</span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIsOpen(false);
                trackEvent('Chatbot Closed');
              }}
            >
              ✖
            </span>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              fontSize: "14px"
            }}
          >
            {messages.map((m, i) => (
              <div key={i}>
                <p><strong>You:</strong> {m.user}</p>
                <p><strong>Bot:</strong> {m.bot}</p>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ display: "flex", padding: "10px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              style={{
                flex: 1,
                padding: "6px",
                borderRadius: "5px",
                border: "1px solid #ccc"
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                marginLeft: "5px",
                padding: "6px 10px",
                background: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}