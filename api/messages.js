const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY

function sendJson(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

async function readJsonBody(req) {
  const chunks = []

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  const raw = Buffer.concat(chunks).toString('utf8')
  return raw ? JSON.parse(raw) : {}
}

function cleanText(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength)
}

async function requestSupabase(path, init = {}) {
  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      status: 500,
      body: { error: 'Supabase environment variables are missing.' }
    }
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
      ...(init.headers || {})
    }
  })

  const text = await response.text()
  let body = null

  try {
    body = text ? JSON.parse(text) : null
  } catch {
    body = { error: text || response.statusText }
  }

  return { status: response.status, body }
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const result = await requestSupabase('messages?select=*&order=created_at.desc')
      return sendJson(res, result.status, result.body || [])
    }

    if (req.method === 'POST') {
      const body = await readJsonBody(req)
      const nickname = cleanText(body.nickname, 40)
      const contact = cleanText(body.contact, 120)
      const content = cleanText(body.content, 500)

      if (!nickname || !content) {
        return sendJson(res, 400, { error: '称呼和留言内容不能为空。' })
      }

      const result = await requestSupabase(
        'messages?columns=%22nickname%22%2C%22contact%22%2C%22content%22',
        {
          method: 'POST',
          headers: { Prefer: 'return=representation' },
          body: JSON.stringify([{ nickname, contact, content }])
        }
      )

      return sendJson(res, result.status, result.body)
    }

    res.setHeader('Allow', 'GET, POST')
    return sendJson(res, 405, { error: 'Method not allowed.' })
  } catch (error) {
    console.error('messages api error:', error)
    return sendJson(res, 500, { error: '留言服务暂时不可用，请稍后再试。' })
  }
}
