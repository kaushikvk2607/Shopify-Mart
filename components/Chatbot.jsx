import { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setLoading(true);

    // Add user message
    setMessages(prev => [
      ...prev,
      { user: userMessage, bot: "Typing..." }
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].bot =
          data.response || data.error || "No response received";
        return updated;
      });

    } catch (error) {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].bot = "Server connection failed";
        return updated;
      });
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
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
          zIndex: 9999,
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
            width: "350px",
            height: "450px",
            background: "white",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#0070f3",
              color: "white",
              padding: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              fontWeight: "bold"
            }}
          >
            <span>shopify_ assistant </span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setIsOpen(false)}
            >
              ✖
            </span>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "12px",
              overflowY: "auto",
              fontSize: "14px",
            }}
          >
            {messages.map((m, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      background: "#0070f3",
                      color: "white",
                      padding: "6px 10px",
                      borderRadius: "12px",
                      display: "inline-block",
                      maxWidth: "80%",
                    }}
                  >
                    {m.user}
                  </span>
                </div>

                <div style={{ textAlign: "left", marginTop: "5px" }}>
                  <span
                    style={{
                      background: "#f1f1f1",
                      padding: "6px 10px",
                      borderRadius: "12px",
                      display: "inline-block",
                      maxWidth: "80%",
                    }}
                  >
                    {m.bot}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ display: "flex", padding: "10px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                marginLeft: "6px",
                padding: "8px 12px",
                background: loading ? "#999" : "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}