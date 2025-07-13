<template>
  <div>
    <button
      :aria-expanded="open"
      @click="open = !open"
      class="w-full text-left py-3 flex justify-between items-center border-b"
    >
      <span>{{ question }}</span>
      <span class="ml-2">{{ open ? '-' : '+' }}</span>
    </button>
    <div v-show="open" class="py-2 text-gray-600">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ question: string }>()
const open = ref(false)
</script>
