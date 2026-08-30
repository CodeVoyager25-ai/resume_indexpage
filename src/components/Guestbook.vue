<template>
  <div class="mb-12">
    <!-- Section Divider -->
    <div class="section-divider">
      <span class="divider-title">访客留言</span>
      <span class="dash-line" />
      <span class="seq-num">05</span>
    </div>
    <p class="text-sm text-[var(--text-secondary)] mb-6 -mt-3 leading-relaxed">
      无需登录，留下你的足迹吧 ✦
    </p>

    <!-- Message Form (glass card) -->
    <div class="glass-card p-6 mb-10">
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <div class="flex gap-4 form-row">
          <input
            id="guest-nickname"
            v-model="formData.nickname"
            name="nickname"
            type="text"
            placeholder="您的称呼（必填）"
            required
            maxlength="40"
            class="guest-input"
          />
          <input
            id="guest-contact"
            v-model="formData.contact"
            name="contact"
            type="text"
            placeholder="联系方式 (可选)"
            maxlength="120"
            class="guest-input"
          />
        </div>
        <textarea
          id="guest-content"
          v-model="formData.content"
          name="content"
          placeholder="留点想对我说的话... (必填)"
          required
          maxlength="500"
          rows="4"
          class="guest-input guest-textarea"
        ></textarea>

        <div v-if="submitError" class="text-xs text-red-300">
          {{ submitError }}
        </div>

        <div class="flex items-center gap-3 mt-1">
          <button
            type="submit"
            :disabled="submitting"
            class="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
            :class="submitting
              ? 'opacity-50 cursor-not-allowed bg-white/5 text-[var(--text-secondary)]'
              : 'bg-gradient-to-r from-[#00B4D8] to-[#00B4D8]/70 text-white shadow-lg shadow-[#00B4D8]/20 hover:shadow-[#00B4D8]/40'"
          >
            {{ submitting ? '正在发射...' : '提交留言' }}
          </button>
          <span class="text-xs text-[var(--text-secondary)]">免登录 · 即刻留言</span>
        </div>
      </form>
    </div>

    <!-- Separator between form and messages -->
    <div v-if="!loading && messages.length > 0 && !guestbookError" class="flex items-center gap-4 mb-6">
      <span class="text-xs font-code text-[var(--color-accent-primary)]">MESSAGES</span>
      <span class="flex-1 h-[1px]" :style="{ background: 'linear-gradient(90deg, var(--color-accent-primary), transparent)' }" />
    </div>

    <!-- Error / Loading / Empty States -->
    <div v-if="guestbookError" class="glass-card p-6 text-center">
      <p class="text-[var(--text-secondary)] text-sm">{{ guestbookError }}</p>
    </div>
    <div v-else-if="loading" class="glass-card p-6 text-center">
      <p class="text-[var(--text-secondary)] text-sm animate-pulse">正在加载留言...</p>
    </div>
    <div v-else-if="messages.length === 0" class="glass-card p-6 text-center">
      <p class="text-[var(--text-secondary)] text-sm">目前还没有留言，快来坐个沙发吧~</p>
    </div>

    <!-- Message List -->
    <div v-else class="flex flex-col gap-5">
      <div v-for="msg in messages" :key="msg.id" class="message-card">
        <div class="flex items-center justify-between mb-2">
          <span class="text-base font-semibold text-[var(--text-primary)]">{{ msg.nickname }}</span>
          <span class="text-xs font-code text-[var(--text-secondary)]">{{ formatDate(msg.created_at) }}</span>
        </div>
        <div v-if="msg.contact" class="mb-3">
          <span
            class="text-xs px-2 py-0.5 rounded-md border"
            :style="{ background: 'rgba(34,211,238,0.06)', color: 'var(--color-accent-primary)', borderColor: 'rgba(34,211,238,0.12)' }"
          >
            {{ msg.contact }}
          </span>
        </div>
        <p class="text-[var(--text-primary)] text-sm leading-relaxed whitespace-pre-wrap m-0">{{ msg.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const messages = ref([])
const loading = ref(true)
const submitting = ref(false)
const guestbookError = ref(null)
const submitError = ref(null)

const formData = reactive({
  nickname: '',
  contact: '',
  content: ''
})

const requestJson = async (url, options) => {
  const response = await fetch(url, options)
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.error || `请求失败 (${response.status})`)
  }

  return data
}

const fetchMessages = async () => {
  try {
    loading.value = true
    guestbookError.value = null
    messages.value = await requestJson('/api/messages')
  } catch (err) {
    console.error('获取留言失败:', err.message)
    guestbookError.value = '加载留言失败，请稍后刷新重试。'
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  try {
    submitting.value = true
    submitError.value = null

    await requestJson('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname: formData.nickname,
        contact: formData.contact,
        content: formData.content
      })
    })

    formData.content = ''
    await fetchMessages()
    alert('留言成功！感谢留下痕迹 🚀')
  } catch (err) {
    console.error('提交留言失败:', err.message)
    submitError.value = err.message || '留言失败，请稍后再试。'
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
.guest-input {
  flex: 1;
  padding: 10px 14px;
  background: var(--color-card-bg);
  border: 1px solid var(--border-glow);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.guest-input:focus {
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.08);
}
html.light .guest-input:focus {
  box-shadow: 0 0 0 2px rgba(129, 189, 179, 0.15);
}
.guest-input::placeholder {
  color: var(--text-secondary);
}
.guest-textarea {
  resize: vertical;
  min-height: 100px;
}

.message-card {
  background: var(--color-card-bg);
  border: 1px solid var(--border-glow);
  backdrop-filter: blur(16px);
  border-radius: 16px;
  padding: 18px 20px;
  position: relative;
  overflow: hidden;
  transition: transform 0.35s, box-shadow 0.35s, border-color 0.35s;
}
.message-card:hover {
  transform: translateY(-2px);
  border-color: rgba(34, 211, 238, 0.18);
  box-shadow: 0 12px 40px rgba(34,211,238,0.06), 0 0 80px rgba(167,139,250,0.03);
}
html.light .message-card:hover {
  border-color: rgba(129,189,179,0.45);
  box-shadow: 0 8px 32px rgba(129,189,179,0.1), 0 0 60px rgba(129,189,179,0.04);
}
.message-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  border-radius: 0 2px 2px 0;
  background: linear-gradient(180deg, var(--color-accent-primary), var(--color-accent-green));
  opacity: 0.7;
  transition: opacity 0.3s;
}
.message-card:hover::before {
  opacity: 1;
}
html.light .message-card::before {
  background: linear-gradient(180deg, var(--color-accent-primary), var(--color-accent-green));
  opacity: 0.5;
}

@media (max-width: 640px) {
  .form-row {
    flex-direction: column;
  }
}
</style>
