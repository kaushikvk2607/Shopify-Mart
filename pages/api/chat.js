export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  try {
    const response = await fetch("http://127.0.0.1:8080/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ msg: message }),
    });

    const text = await response.text();

    return res.status(200).json({ response: text });

  } catch (error) {
    console.error("Backend error:", error);
    return res.status(500).json({ error: "Backend connection failed" });
  }
}