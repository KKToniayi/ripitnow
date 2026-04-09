export const config = { runtime: “edge” };

export default async function handler(req) {
const headers = {
“Access-Control-Allow-Origin”: “*”,
“Access-Control-Allow-Methods”: “POST, OPTIONS”,
“Access-Control-Allow-Headers”: “Content-Type”,
“Content-Type”: “application/json”,
};

if (req.method === “OPTIONS”) {
return new Response(null, { headers });
}

const body = await req.json();
const msgs = [{ role: “system”, content: body.system || “” }].concat(body.messages || []);

const r = await fetch(“https://api.deepseek.com/v1/chat/completions”, {
method: “POST”,
headers: {
“Content-Type”: “application/json”,
“Authorization”: “Bearer “ + process.env.DEEPSEEK_API_KEY,
},
body: JSON.stringify({ model: “deepseek-chat”, max_tokens: 1000, messages: msgs }),
});

const d = await r.json();
const text = (d.choices && d.choices[0]) ? d.choices[0].message.content : “Go ahead.”;
return new Response(JSON.stringify({ content: [{ type: “text”, text: text }] }), { headers });
}
