module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  let body = req.body;
  if (typeof body === 'string') { body = JSON.parse(body); }
  const sysMsg = { role: 'system', content: body.system || '' };
  const userMsgs = (body.messages || []).map(function(m) {
    return { role: m.role === 'user' ? 'user' : 'assistant', content: m.content };
  });
  const messages = [sysMsg].concat(userMsgs);
  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.DEEPSEEK_API_KEY,
    },
    body: JSON.stringify({ model: 'deepseek-chat', max_tokens: 1000, messages: messages }),
  });
  const data = await response.json();
  const text = (data.choices && data.choices[0]) ? data.choices[0].message.content : 'Go ahead.';
  return res.status(200).json({ content: [{ type: 'text', text: text }] });
};
