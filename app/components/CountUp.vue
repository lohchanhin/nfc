<template>
  <span ref="el">{{ display }}</span>
</template>

<script setup lang="ts">
const props = defineProps<{ end: number }>()
const display = ref(0)
const el = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!el.value) return
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      start()
      observer.disconnect()
    }
  })
  observer.observe(el.value)
})

function start() {
  const step = Math.max(1, Math.round(props.end / 60))
  const timer = setInterval(() => {
    display.value += step
    if (display.value >= props.end) {
      display.value = props.end
      clearInterval(timer)
    }
  }, 16)
}
</script>
