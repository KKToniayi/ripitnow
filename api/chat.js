module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  try {
    let body = req.body;
    if (typeof body === 'string') { body = JSON.parse(body); }

    const sysMsg = { role: 'system', content: body.system || '' };
    const userMsgs = (body.messages || []).map(function(m) {
      return {
        role: m.role === 'user' ? 'user' : 'assistant',
        content: typeof m.content === 'string' ? m.content : ''
      };
    }).filter(function(m) {
      return m.content.trim().length > 0;
    });

    const messages = [sysMsg].concat(userMsgs);
    const requestedModel = typeof body.model === 'string' ? body.model : '';
    const model = requestedModel.indexOf('deepseek') === 0 ? requestedModel : 'deepseek-chat';

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.DEEPSEEK_API_KEY,
      },
      body: JSON.stringify({
        model: model,
        max_tokens: body.max_tokens || 1000,
        messages: messages
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: data && data.error ? data.error : { message: 'Upstream chat API error' }
      });
    }

    const text = data && data.choices && data.choices[0] && data.choices[0].message
      ? data.choices[0].message.content
      : '';

    if (!text) {
      return res.status(502).json({
        error: { message: 'Chat API returned empty content' }
      });
    }

    return res.status(200).json({ content: [{ type: 'text', text: text }] });
  } catch (err) {
    return res.status(500).json({
      error: { message: err && err.message ? err.message : 'Unknown server error' }
    });
  }
};
