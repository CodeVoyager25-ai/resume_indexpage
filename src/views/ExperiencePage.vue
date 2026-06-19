<script setup>
import TimeLineTrack from '../components/sections/TimeLineTrack.vue'
import ProgressBar from '../components/ui/ProgressBar.vue'
import BaseCard from '../components/ui/BaseCard.vue'
import { skills } from '../config/userProfile.js'
</script>

<template>
  <div class="max-w-5xl mx-auto">
    <TimeLineTrack />

    <!-- Skills Section -->
    <section class="mt-10">
      <div class="flex items-center gap-3 mb-6">
        <h2 class="text-2xl font-bold text-white">技术能力</h2>
        <div class="h-px flex-1 bg-gradient-to-r from-[#00B4D8]/40 to-transparent" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseCard padding="p-6">
          <ProgressBar
            v-for="skill in skills.slice(0, 3)"
            :key="skill.label"
            :label="skill.label"
            :percent="skill.percent"
            :delay="0"
          />
        </BaseCard>
        <BaseCard padding="p-6">
          <ProgressBar
            v-for="skill in skills.slice(3)"
            :key="skill.label"
            :label="skill.label"
            :percent="skill.percent"
            :delay="0"
          />
        </BaseCard>
      </div>
    </section>
  </div>
</template>
