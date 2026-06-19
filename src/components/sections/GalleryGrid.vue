<script setup>
import { ref, computed } from 'vue'
import BaseCard from '../ui/BaseCard.vue'

const activeTag = ref('全部')
const tags = ['全部', '幸福降临', '我和你', '绊', '绽放生命力']

const galleryItems = [
  { title: '首尔看不到极光', cat: '你和我', desc: '我见到了我的极光', image: '/img/爱翻5.jpg' },
  { title: 'papago', cat: '幸福降临', desc: '你在左边~我紧靠右~', image: '/img/生成我的世界像素风图片.png'},
  { title: '害羞错愕', cat: '绽放生命力', desc: '小桃洗面添光泽，未点胭脂已自红', image: '/img/壁纸7.jpg' },
  { title: '师兄-衰小孩', cat: '绊', desc: '风王之瞳，永伴君焰', image: '/img/风王.jpg' },
  { title: 'Canada', cat: '你和我', desc: '向左边倾斜的椅子'  , image: '/img/爱翻1.jpg'},
  { title: '海滩日落', cat: '幸福降临', desc: '雪山拥住漫天极光', image: '/img/欧若拉.jpg' },
  { title: '月月', cat: '绽放生命力', desc: '笑容是温柔本身，眼角刻印着细腻', image: '/img/月月.jpg' },
  { title: '鳄鱼叔叔', cat: '绊', desc: '你鳄鱼叔叔又又又美美隐身啦'  , image: '/img/dae.jpg'},
  { title: '极光下赴你一面之约', cat: '你和我', desc: '我们凑齐了四叶草'  , image: '/img/爱翻2.jpg'},
  { title: '向日葵的花语', cat: '幸福降临', desc: '太阳不及你耀眼', image: '/img/yemei.jpg' },
  { title: '蜡笔小新', cat: '绽放生命力', desc: '春日部捣蛋鬼集合！', image: '/img/壁纸10.jpg' },
  { title: '誓死不退', cat: '绊', desc: '不思量，自难忘', image: '/img/壁纸8.jpg' },
]

const filteredItems = computed(() => {
  if (activeTag.value === '全部') return galleryItems
  return galleryItems.filter((item) => item.cat === activeTag.value)
})
</script>

<template>
  <section>
    <div class="section-divider">
      <span class="divider-title">相册</span>
      <span class="dash-line" />
      <span class="seq-num">06</span>
    </div>
    <p class="text-[var(--text-secondary)] mb-6 -mt-3 text-sm">记录生活与工作中的精彩瞬间。</p>

    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="tag in tags" :key="tag" @click="activeTag = tag"
        class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
        :class="activeTag === tag
          ? 'bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/20'
          : 'text-[var(--text-secondary)] border border-white/5 hover:text-[var(--text-primary)] hover:border-white/10'"
      >{{ tag }}</button>
    </div>

    <div class="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
      <BaseCard v-for="item in filteredItems" :key="item.title" padding="p-4" class="break-inside-avoid">
        <div class="flex flex-col">
          <!-- Image or Emoji placeholder -->
          <div 
            v-if="item.image"
            class="w-full h-36 rounded-xl mb-3 overflow-hidden"
          >
            <img 
              :src="item.image" 
              :alt="item.title"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div 
            v-else
            class="w-full h-36 rounded-xl mb-3 flex items-center justify-center text-4xl" 
            style="background: rgba(34, 211, 238, 0.03);"
          >
            <span v-if="item.cat === '风景'">🏔️</span>
            <span v-else-if="item.cat === '代码'">💻</span>
            <span v-else-if="item.cat === '日常'">📷</span>
            <span v-else>🎨</span>
          </div>
          
          <span class="text-xs font-code px-2 py-0.5 rounded-md inline-block mb-2 w-fit border" :style="{ background: 'rgba(34, 211, 238, 0.05)', color: 'var(--color-accent-primary)', borderColor: 'rgba(34, 211, 238, 0.12)' }">{{ item.cat }}</span>
          <h3 class="font-bold text-[var(--text-primary)] text-sm mb-1">{{ item.title }}</h3>
          <p class="text-xs text-[var(--text-secondary)]">{{ item.desc }}</p>
        </div>
      </BaseCard>
    </div>
  </section>
</template>
