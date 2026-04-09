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

// Convert to DeepSeek format
const deepseekBody = {
model: “deepseek-chat”,
max_tokens: body.max_tokens || 1000,
system: body.system,
messages: body.messages
};

console.log(“Sending to DeepSeek:”, JSON.stringify(deepseekBody).slice(0, 200));

const response = await fetch(“https://api.deepseek.com/v1/chat/completions”, {
method: “POST”,
headers: {
“Content-Type”: “application/json”,
“Authorization”: `Bearer ${process.env.DEEPSEEK_API_KEY}`
},
body: JSON.stringify({
model: “deepseek-chat”,
max_tokens: body.max_tokens || 1000,
messages: [
{ role: “system”, content: body.system || “” },
…body.messages
]
})
});

const data = await response.json();
console.log(“DeepSeek response status:”, response.status);

// Convert DeepSeek response format to Anthropic format
if (data.choices && data.choices[0]) {
const converted = {
content: [{ type: “text”, text: data.choices[0].message.content }]
};
return res.status(200).json(converted);
}

return res.status(response.status).json(data);
}
