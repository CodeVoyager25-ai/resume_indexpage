/**
 * 用户个人资料集中配置
 * 数据驱动所有页面与组件的内容渲染
 */

export const profile = {
  avatar: '/img/zuozhu.png',
  avatarAlt: 'liwen Li',
  username: 'wenzheng Li',
  signature: '嵌入式系统 / 物联网 / 边缘 AI 开发者',
  email: 'aishaliwen@example.com',
  copyright: 'aishaliwen22@gmail.com',
}

export const infoItems = [
  { label: '技术方向', value: '嵌入式 & 边缘AI' },
  { label: '所在城市', value: '广东揭阳' },
  { label: '当前身份', value: '嵌入式开发者' },
  { label: '核心技能', value: 'C / RTOS / IoT' },
  { label: '开源贡献', value: '6+ 仓库活跃' },
]

export const socialLinks = [
  {
    name: 'GitHub',
    svg: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
    url: 'https://github.com/CodeVoyager25-ai',
  },
  {
    name: 'Gitee',
    svg: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm6.09 5.333c.328 0 .593.266.593.593v1.482a.594.594 0 0 1-.593.593H9.777c-.386 0-.7.313-.7.7v.147c0 .328.265.593.593.593H11.5c1.946 0 3.52 1.574 3.52 3.52 0 1.853-1.434 3.37-3.25 3.504v.066h1.55c.806 0 1.46.654 1.46 1.46v.066H8.29a.593.593 0 0 1-.593-.593v-1.482a.594.594 0 0 1 .593-.593h1.55v-.066c-1.816-.134-3.25-1.65-3.25-3.504 0-1.946 1.574-3.52 3.52-3.52h1.83c.387 0 .7-.313.7-.7v-.147a.594.594 0 0 1 .593-.593h3.85z"/></svg>`,
    url: 'https://gitee.com/aishaliwen',
  },
  {
    name: 'WeChat',
    svg: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.952-7.062-6.122zm-2.18 2.769c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z"/></svg>`,
    url: '#',
  },
  {
    name: 'Email',
    svg: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
    url: 'mailto:aishaliwen22@gmail.com',
  },
]

export const heroStats = [
  { target: 6, suffix: '', label: '核心项目', icon: '🖥️' },
  { target: 6, suffix: '+', label: '开源仓库', icon: '📦' },
  { target: 100, suffix: '%', label: '源码交付', icon: '🔧' },
]

export const abilities = [
  {
    title: '嵌入式硬件与固件开发',
    desc: '底层驱动开发与硬件系统设计',
    list: ['STM32 / ESP32 / ARM Cortex-M', 'RTOS 实时操作系统', 'C / C++ 嵌入式编程'],
  },
  {
    title: '边缘 AI 与具身智能',
    desc: '端侧 AI 推理与智能硬件融合',
    list: ['TinyML / TensorFlow Lite', '边缘计算与传感器融合', '机器人嵌入式控制'],
  },
  {
    title: '物联网与环境感知',
    desc: '端到端 IoT 系统设计与部署',
    list: ['MQTT / CoAP / BLE / LoRa', '传感器网络与数据采集', 'Node-RED / 物联网云平台'],
  },
  {
    title: '现代化全栈与 AI 辅助开发',
    desc: 'Web 工具链与智能开发实践',
    list: ['Vue / Python FastAPI', '数据库设计与 RESTful API', 'AI 辅助编码与自动化'],
  },
]

export const timelineItems = [
  {
    year: '2024 - 至今',
    title: '嵌入式系统与边缘AI开发',
    company: '独立开发者 & 开源贡献者',
    desc: '专注于 STM32/ESP32 平台开发，探索 TinyML 与边缘推理在物联网中的应用。维护 6+ 个开源仓库，涵盖嵌入式驱动、传感器库与边缘计算工具。',
    type: 'work',
  },
  {
    year: '2025 - 2026',
    title: '物联网系统集成与固件开发',
    company: '技术实验室 / 校企合作项目',
    desc: '参与智慧农业与环境监测 IoT 项目，负责终端传感器节点固件开发与 MQTT 数据上云。实现低功耗 BLE + LoRa 混合组网方案。',
    type: 'work',
  },
  {
    year: '2026-04 - 2026-05',
    title: '嵌入式系统与C语言深入学习',
    company: '自学 & 导师指导',
    desc: '系统学习 ARM Cortex-M 架构、RTOS 内核原理与外设驱动开发。完成多个基于 FreeRTOS 的实战项目，深入理解中断、DMA 与低功耗设计。',
    type: 'edu',
  },
  {
    year: '2014 - 2026',
    title: '计算机基础与编程入门',
    company: '揭阳职业技术学院',
    desc: '主修嵌入式应用，掌握 C 语言、数据结构与算法。在校期间开始接触 ESP32/STM32 开发板，对嵌入式系统产生浓厚兴趣。',
    type: 'edu',
  },
]

export const skills = [
  { label: 'C / C++ 嵌入式编程', percent: 90 },
  { label: 'STM32 / ARM Cortex-M', percent: 85 },
  { label: 'RTOS (FreeRTOS / RT-Thread)', percent: 80 },
  { label: 'IoT 协议 (MQTT / BLE / LoRa)', percent: 78 },
  { label: 'Python (数据处理 & 工具链)', percent: 72 },
]

export const githubRepos = [
  {
    name: 'stm32-hal-driver-collection',
    desc: '一套面向 STM32F108C8T6 系列的 HAL 外设驱动库集合，包含 I2C、SPI、UART、DMA 通用驱动模板与 CMSIS-RTOS 适配层。',
    lang: 'C',
    langColor: '#555555',
    stars: 47,
    forks: 12,
    tags: ['C & Embedded'],
  },
  {
    name: 'mimiclaw_deepseek_V4',
    desc: '基于 ESP32-S3 + DeepSeek 的具身智能助手框架；支持通过飞书/Lark 实现端到端大模型工具调用，可控制板载 RGB / 外部呼吸灯。',
    lang: 'C',
    langColor: '#555555',
    stars: 63,
    forks: 18,
    tags: ['C & Embedded'],
  },
  {
    name: 'iot-env-monitor',
    desc: '物联网环境监测系统——终端节点基于 STM32L0 + LoRa，网关采用 ESP32，云端使用 MQTT 对接 ThingsBoard 实现可视化。',
    lang: 'C',
    langColor: '#555555',
    stars: 35,
    forks: 9,
    tags: ['IoT', 'C & Embedded'],
  },
  {
    name: 'mqtt-ble-bridge',
    desc: '轻量 MQTT-BLE 协议桥接网关，运行于 Linux/OpenWrt，支持 BLE 传感器数据自动发现与上报至 MQTT Broker。',
    lang: 'Python',
    langColor: '#3572A5',
    stars: 28,
    forks: 6,
    tags: ['IoT'],
  },
  {
    name: 'aishaliwen-portfolio',
    desc: '个人技术网站源码——使用 Vue 3 + Vite + Tailwind CSS 构建，展示嵌入式项目、开源仓库与技术能力。',
    lang: 'Vue',
    langColor: '#41b883',
    stars: 15,
    forks: 3,
    tags: ['Web & Fullstack'],
  },
  {
    name: 'embedded-dev-toolkit',
    desc: '嵌入式开发辅助工具箱——串口调试助手、I2C 设备扫描器、传感器数据可视化面板，基于 Python + PyQt6。',
    lang: 'Python',
    langColor: '#3572A5',
    stars: 41,
    forks: 11,
    tags: ['Web & Fullstack'],
  },
]

export const cases = [
  {
    title: 'MimiClaw 全栈 AI 开源项目',
    desc: '核心发起人。对接 DeepSeek API，通过 MCP 协议实现大模型硬件控制；WSL2+VsCode 搭建开发环境，项目 GitHub 开源。全程使用 VsCode+Claude Code(CLI) 辅助开发提效。',
    tech: 'AI / 全栈 / 开源 / 嵌入式',
    tag: '精选',
  },
  {
    title: '电商决策辅助系统',
    desc: 'Python + Flask 搭建后端，基于 SQLite 设计原子状态机与幂等机制；集成 GLM-4 API 实现评论情感分析，并使用 Jinja2 渲染数据看板。',
    tech: 'AI / Web / 后端',
  },
  {
    title: 'AI 原型自动化部署实践',
    desc: '依托 Google AI Studio 生成前端代码，接入 Vercel 实现 CI/CD 自动部署, DNS 解析由 Cloudflare 提供；沉淀 AI 驱动的敏捷交付工作流。',
    tech: 'AI / Web / DevOps',
  },
  {
    title: '个人技术作品集网站',
    desc: 'Vue3+Vite+Tailwind CSS v4 搭建 SPA 站点，集成 Vue Router、Pinia，实现 5 个路由页面与明暗主题切换；Claude Code +Cursor 辅助开发。',
    tech: 'Web / Vue',
  },
]

export const projectGridItems = [
  {
    title: '2026.05-06 · MimiClaw 全栈 AI 开源项目',
    desc: '核心发起人。对接 DeepSeek API，通过 MCP 协议实现大模型硬件控制；WSL2+VsCode 搭建开发环境，项目 GitHub 开源。全程使用 VsCode+Claude Code(CLI) 辅助开发提效。',
    tags: ['AI', '全栈', '开源', '嵌入式'],
    stars: 0,
  },
  {
    title: '2026.04-05 · 电商决策辅助系统',
    desc: 'Python + Flask 搭建后端，基于 SQLite 设计原子状态机与幂等机制；集成 GLM-4 API 实现评论情感分析，并使用 Jinja2 渲染数据看板。',
    tags: ['AI', 'Web', '后端'],
    stars: 0,
  },
  {
    title: '2026.03-04 · AI 原型自动化部署实践',
    desc: '依托 Google AI Studio 生成前端代码，接入 Vercel 实现 CI/CD 自动部署,DNS解析由Cloudflare提供；沉淀 AI 驱动的敏捷交付工作流。 网址：--https://aishaliwen.eu.cc',
    tags: ['AI', 'Web', 'DevOps'],
    stars: 0,
  },
  {
    title: '2026.02-03 · 个人技术作品集网站',
    desc: 'Vue3+Vite+Tailwind CSS v4 搭建 SPA 站点，集成 Vue Router、Pinia，实现 5 个路由页面与明暗主题切换；Claude Code +Cursor 辅助开发。网址：--https://resume.aishaliwen.eu.cc',
    tags: ['Web', 'Vue'],
    stars: 0,
  },
  {
    title: '2026.01-02 · HarmonyOS 2048 游戏',
    desc: 'ArkTS 实现前端交互，Python + SQLite 搭建后端排行榜功能，并利用 AI 工具辅助完成单元测试生成与 Bug 修复。',
    tags: ['Web', '全栈', 'HarmonyOS', '游戏'],
    stars: 0,
  },
  {
    title: 'AI 编程工具实践',
    desc: '熟练运用 Cursor、Claude Code 等 AI 编程工具，掌握提示词工程与大模型 API 落地开发流程。',
    tags: ['AI'],
    stars: 0,
  },
]
