export default async function handler(req, res) {
  const { message } = req.body;

  try {
    const response = await fetch("http://127.0.0.1:8080/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        msg: message,
      }),
    });

    const data = await response.text();

    res.status(200).json({ response: data });
  } catch (error) {
    res.status(500).json({ error: "Chat failed" });
  }
}