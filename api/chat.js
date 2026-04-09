export const config = { runtime: “edge” };

export default async function handler(req) {
if (req.method === “OPTIONS”) {
return new Response(null, {
headers: {
“Access-Control-Allow-Origin”: “*”,
“Access-Control-Allow-Methods”: “POST, OPTIONS”,
“Access-Control-Allow-Headers”: “Content-Type”,
},
});
}

const body = await req.json();

const messages = [
{ role: “system”, content: body.system || “” },
…(body.messages || []),
];

const response = await fetch(“https://api.deepseek.com/v1/chat/completions”, {
method: “POST”,
headers: {
“Content-Type”: “application/json”,
“Authorization”: “Bearer “ + process.env.DEEPSEEK_API_KEY,
},
body: JSON.stringify({
model: “deepseek-chat”,
max_tokens: body.max_tokens || 1000,
messages: messages,
}),
});

const data = await response.json();

const text = data.choices?.[0]?.message?.content || “Go ahead.”;

return new Response(
JSON.stringify({ content: [{ type: “text”, text }] }),
{
headers: {
“Content-Type”: “application/json”,
“Access-Control-Allow-Origin”: “*”,
},
}
);
}
