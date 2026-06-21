<template>
  <div class="guestbook-container">
    <h2 class="title">💬 访客留言板 (免登录)</h2>

    <form @submit.prevent="handleSubmit" class="message-form">
      <div class="form-row">
        <input
          v-model="formData.nickname"
          type="text"
          placeholder="您的称呼（必填）"
          required
          class="form-input"
        />
        <input
          v-model="formData.contact"
          type="text"
          placeholder="联系方式 (邮箱/微信，可选)"
          class="form-input"
        />
      </div>
      <textarea
        v-model="formData.content"
        placeholder="留点想对我说的话... (必填)"
        required
        rows="4"
        class="form-textarea"
      ></textarea>

      <button type="submit" :disabled="submitting" class="submit-btn">
        {{ submitting ? '正在发射...' : '提交留言' }}
      </button>
    </form>

    <div class="message-list">
      <div v-if="supabaseError" class="status-tip error-tip">{{ supabaseError }}</div>
      <div v-else-if="loading" class="status-tip">正在努力加载留言...</div>
      <div v-else-if="messages.length === 0" class="status-tip">目前还没有留言，快来坐个沙发吧~</div>

      <div v-else v-for="msg in messages" :key="msg.id" class="message-card">
        <div class="card-header">
          <span class="nickname">👤 {{ msg.nickname }}</span>
          <span class="time">{{ formatDate(msg.created_at) }}</span>
        </div>
        <div v-if="msg.contact" class="contact-tag">联系方式: {{ msg.contact }}</div>
        <p class="content">{{ msg.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getSupabase } from '../utils/supabase'

const messages = ref([])
const loading = ref(true)
const submitting = ref(false)
const supabaseError = ref(null)

const formData = reactive({
  nickname: '',
  contact: '',
  content: ''
})

const fetchMessages = async () => {
  const supabase = getSupabase()
  if (!supabase) {
    supabaseError.value = '留言服务暂未配置，请联系站长。'
    loading.value = false
    return
  }
  try {
    loading.value = true
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    messages.value = data
  } catch (err) {
    console.error('获取留言失败:', err.message)
    supabaseError.value = '加载留言失败，请稍后刷新重试。'
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  const supabase = getSupabase()
  if (!supabase) {
    alert('留言服务暂未配置')
    return
  }
  try {
    submitting.value = true
    const { error } = await supabase
      .from('messages')
      .insert([
        {
          nickname: formData.nickname,
          contact: formData.contact,
          content: formData.content
        }
      ])

    if (error) throw error

    formData.content = ''
    await fetchMessages()
    alert('留言成功！感谢留下痕迹 🚀')
  } catch (err) {
    console.error('提交留言失败:', err.message)
    alert('留言失败，请稍后再试')
  } finally {
    submitting.value = false
  }
}

const formatDate = (isoString) => {
  const date = new Date(isoString)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

onMounted(() => {
  fetchMessages()
})
</script>

<style scoped>
.guestbook-container { max-width: 700px; margin: 40px auto; padding: 20px; font-family: sans-serif; }
.title { font-size: 1.5rem; margin-bottom: 20px; color: #333; }
.message-form { display: flex; flex-direction: column; gap: 15px; margin-bottom: 40px; background: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #eee; }
.form-row { display: flex; gap: 15px; }
.form-input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.95rem; }
.form-textarea { padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.95rem; resize: vertical; }
.submit-btn { padding: 12px; background: #0070f3; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; font-weight: bold; transition: background 0.2s; }
.submit-btn:hover { background: #0051cb; }
.submit-btn:disabled { background: #ccc; cursor: not-allowed; }
.status-tip { text-align: center; color: #999; font-style: italic; margin-top: 20px; }
.error-tip { color: #e74c3c; }
.message-card { background: white; border: 1px solid #eee; padding: 15px; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
.card-header { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem; }
.nickname { font-weight: bold; color: #222; }
.time { color: #999; }
.contact-tag { font-size: 0.8rem; color: #0070f3; background: #e6f0ff; display: inline-block; padding: 2px 6px; border-radius: 4px; margin-bottom: 8px; }
.content { color: #444; line-height: 1.6; margin: 0; white-space: pre-wrap; }
</style>
