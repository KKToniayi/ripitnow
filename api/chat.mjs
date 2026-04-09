export default async function handler(req, res) {
res.setHeader(“Access-Control-Allow-Origin”, “*”);
res.setHeader(“Access-Control-Allow-Methods”, “POST, OPTIONS”);
res.setHeader(“Access-Control-Allow-Headers”, “Content-Type”);

if (req.method === “OPTIONS”) {
return res.status(200).end();
}

let body = req.body;
if (typeof body === “string”) {
body = JSON.parse(body);
}

const messages = [
{ role: “system”, content: body.system || “” }
].concat(body.messages || []);

const response = await fetch(“https://api.deepseek.com/v1/chat/completions”, {
method: “POST”,
headers: {
“Content-Type”: “application/json”,
“Authorization”: “Bearer “ + process.env.DEEPSEEK_API_KEY
},
body: JSON.stringify({
model: “deepseek-chat”,
max_tokens: body.max_tokens || 1000,
messages: messages
})
});

const data = await response.json();

if (data.choices && data.choices[0]) {
return res.status(200).json({
content: [{ type: “text”, text: data.choices[0].message.content }]
});
}

return res.status(500).json({ error: “No response from DeepSeek” });
}
