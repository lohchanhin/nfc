<template>
  <div class="p-4 space-y-4">
    <h1 class="text-xl font-bold mb-4">會員儀表板</h1>
    <div v-if="pendingUser || pendingSub">載入中...</div>
    <div v-else class="space-y-4">
      <div class="bg-gray-50 p-4 rounded shadow">
        <h2 class="font-semibold mb-2">會員資料</h2>
        <p>Email：{{ user?.email }}</p>
      </div>
      <div class="bg-gray-50 p-4 rounded shadow">
        <h2 class="font-semibold mb-2">訂閱狀態</h2>
        <p>狀態：{{ status || '無' }}</p>
        <p v-if="expiration">到期日：{{ expiration }}</p>
        <button
          v-if="status && status !== 'canceled'"
          @click="onCancel"
          class="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          取消訂閱
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
interface SubscriptionRes {
  status: string | null
  currentPeriodEnd?: number
}

interface UserRes {
  id: string
  email: string
}

const { data: subData, pending: pendingSub, refresh } =
  await useFetch<SubscriptionRes>('/api/subscription')
const { data: userData, pending: pendingUser } = await useFetch<UserRes>('/api/user')

const user = computed(() => userData.value)
const status = computed(() => subData.value?.status ?? null)
const expiration = computed(() => {
  const ts = subData.value?.currentPeriodEnd
  return ts ? new Date(ts * 1000).toLocaleDateString('zh-TW') : null
})

const cancel = async () => {
  await $fetch('/api/subscription/cancel', { method: 'POST' })
  await refresh()
}

const onCancel = async () => {
  if (confirm('確定要取消訂閱嗎？')) {
    await cancel()
  }
}
</script>
