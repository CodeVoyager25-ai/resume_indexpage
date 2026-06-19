<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animationId = null
let particles = []
let auroraBands = []
let time = 0
let mouse = { x: null, y: null }

const PARTICLE_COUNT = 60
const AURORA_BAND_COUNT = 4

// Aurora color palette
const colors = [
  { r: 34, g: 211, b: 238 },   // cyan
  { r: 110, g: 231, b: 183 },  // green
  { r: 167, g: 139, b: 250 },  // purple
  { r: 56, g: 189, b: 248 },   // sky blue
  { r: 129, g: 140, b: 248 },  // indigo
]

class AuroraParticle {
  constructor(w, h) {
    this.reset(w, h, true)
  }

  reset(w, h, initial = false) {
    this.x = Math.random() * w
    this.y = initial ? Math.random() * h : h + 20
    this.baseX = this.x

    // Aurora colors
    const color = colors[Math.floor(Math.random() * colors.length)]
    this.r = color.r
    this.g = color.g
    this.b = color.b

    // Larger, softer particles
    this.radius = Math.random() * 3 + 1.5
    this.maxOpacity = Math.random() * 0.4 + 0.15

    // Gentle upward drift
    this.vy = -(Math.random() * 0.3 + 0.1)
    // Subtle horizontal sway
    this.swayAmp = Math.random() * 1.5 + 0.3
    this.swayFreq = Math.random() * 0.02 + 0.005
    this.swayPhase = Math.random() * Math.PI * 2

    // Slow opacity pulse
    this.pulseSpeed = Math.random() * 0.015 + 0.005
    this.pulsePhase = Math.random() * Math.PI * 2
    this.opacity = initial ? Math.random() * this.maxOpacity : 0
  }

  update(w, h, t) {
    // Float upward
    this.y += this.vy

    // Horizontal sway
    this.x = this.baseX + Math.sin(t * this.swayFreq + this.swayPhase) * this.swayAmp

    // Mouse attraction (gentle)
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x
      const dy = mouse.y - this.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 180) {
        const force = (180 - dist) / 180
        this.x += (dx / dist) * force * 0.15
        this.y += (dy / dist) * force * 0.08
      }
    }

    // Opacity pulsing
    this.opacity = this.maxOpacity * (0.5 + 0.5 * Math.sin(t * this.pulseSpeed + this.pulsePhase))

    // Reset when above viewport
    if (this.y < -20) {
      this.y = h + 20
      this.x = Math.random() * w
      this.baseX = this.x
    }

    // Wrap horizontally
    if (this.x < -20) this.x = w + 20
    if (this.x > w + 20) this.x = -20
  }

  draw(ctx) {
    if (this.opacity <= 0.01) return

    // Outer glow
    const glowGrad = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.radius * 6
    )
    glowGrad.addColorStop(0, `rgba(${this.r}, ${this.g}, ${this.b}, ${this.opacity})`)
    glowGrad.addColorStop(0.3, `rgba(${this.r}, ${this.g}, ${this.b}, ${this.opacity * 0.5})`)
    glowGrad.addColorStop(1, `rgba(${this.r}, ${this.g}, ${this.b}, 0)`)

    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius * 6, 0, Math.PI * 2)
    ctx.fillStyle = glowGrad
    ctx.fill()

    // Bright core
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.opacity * 1.5})`
    ctx.fill()
  }
}

// Aurora band - horizontal curtain of color
class AuroraBand {
  constructor(w, h, index) {
    this.index = index
    this.width = w
    this.height = h
    this.baseY = h * (0.15 + index * 0.18)
    this.amplitude = 25 + Math.random() * 35
    this.frequency = 0.0008 + Math.random() * 0.0015
    this.speed = 0.003 + Math.random() * 0.005
    this.phase = Math.random() * Math.PI * 2

    const color = colors[Math.floor(Math.random() * colors.length)]
    this.r = color.r
    this.g = color.g
    this.b = color.b
    this.bandHeight = 60 + Math.random() * 120
    this.maxAlpha = 0.015 + Math.random() * 0.025
  }

  update(t) {
    this.phase += this.speed
  }

  draw(ctx, t) {
    const alpha = this.maxAlpha * (0.7 + 0.3 * Math.sin(t * 0.003 + this.phase))

    ctx.save()
    ctx.globalCompositeOperation = 'screen'

    // Draw wavy band
    ctx.beginPath()
    const step = 4
    for (let x = 0; x <= this.width; x += step) {
      const y = this.baseY + Math.sin(x * this.frequency + this.phase) * this.amplitude
      if (x === 0) ctx.moveTo(x, y - this.bandHeight / 2)
      else ctx.lineTo(x, y - this.bandHeight / 2)
    }
    for (let x = this.width; x >= 0; x -= step) {
      const y = this.baseY + Math.sin(x * this.frequency + this.phase) * this.amplitude
      ctx.lineTo(x, y + this.bandHeight / 2)
    }
    ctx.closePath()

    const bandGrad = ctx.createLinearGradient(0, this.baseY - this.bandHeight, 0, this.baseY + this.bandHeight)
    bandGrad.addColorStop(0, `rgba(${this.r}, ${this.g}, ${this.b}, 0)`)
    bandGrad.addColorStop(0.5, `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha})`)
    bandGrad.addColorStop(1, `rgba(${this.r}, ${this.g}, ${this.b}, 0)`)

    ctx.fillStyle = bandGrad
    ctx.fill()
    ctx.restore()
  }
}

function init(width, height) {
  particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new AuroraParticle(width, height))
  }

  auroraBands = []
  for (let i = 0; i < AURORA_BAND_COUNT; i++) {
    auroraBands.push(new AuroraBand(width, height, i))
  }
}

function animate(ctx, width, height) {
  time += 1
  ctx.clearRect(0, 0, width, height)

  // Draw aurora bands
  for (const band of auroraBands) {
    band.update(time)
    band.draw(ctx, time)
  }

  // Draw particles
  for (const p of particles) {
    p.update(width, height, time)
    p.draw(ctx)
  }

  animationId = requestAnimationFrame(() => animate(ctx, width, height))
}

onMounted(() => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')

  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init(canvas.width, canvas.height)
  }

  resize()
  window.addEventListener('resize', resize)

  canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null
    mouse.y = null
  })

  animate(ctx, canvas.width, canvas.height)

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', resize)
  })
})
</script>

<template>
  <canvas ref="canvasRef" id="triangle-lost-in-space"></canvas>
</template>
