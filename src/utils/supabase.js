import { createClient } from '@supabase/supabase-js'

// 1. 从环境变量文件中读取配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 2. 校验 URL 是否合法，避免无效配置直接炸掉全站
function isValidUrl(str) {
  try {
    const url = new URL(str)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

// 3. 懒加载：只有在 URL 合法时才创建客户端
let supabaseInstance = null

export function getSupabase() {
  if (!supabaseInstance) {
    if (!supabaseUrl || !isValidUrl(supabaseUrl)) {
      console.warn('[Supabase] VITE_SUPABASE_URL 未配置或不是有效的 HTTP/HTTPS URL，留言功能暂不可用。')
      return null
    }
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseInstance
}

// 保持向后兼容的默认导出（延迟访问时才初始化）
export const supabase = new Proxy({}, {
  get(_, prop) {
    const client = getSupabase()
    if (!client) {
      throw new Error('[Supabase] 客户端未初始化，请检查 .env.local 中的 VITE_SUPABASE_URL 是否为有效 URL')
    }
    return client[prop]
  }
})
