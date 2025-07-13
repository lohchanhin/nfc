<template>
  <div class="p-4 space-y-4">
    <h1 class="text-xl font-bold mb-4">會員儀表板</h1>
    <div v-if="pendingUser || pendingSub || pendingUsage">載入中...</div>
    <div v-else class="space-y-4">
      <div class="bg-gray-50 p-4 rounded shadow">
        <h2 class="font-semibold mb-2">會員資料</h2>
        <p>Email：{{ user?.email }}</p>
      </div>
      <div class="bg-gray-50 p-4 rounded shadow">
        <h2 class="font-semibold mb-2">方案資訊</h2>
        <p>方案：{{ usage?.plan }}</p>
        <p>額度：{{ usage?.quota }}</p>
        <p v-if="exp">到期日：{{ exp }}</p>
      <button
          v-if="status && status !== 'canceled'"
          @click="onCancel"
          class="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          取消訂閱
        </button>
        <button
          v-if="status"
          @click="onPortal"
          class="mt-4 ml-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          管理訂閱
        </button>
      </div>
      <button
        class="px-4 py-2 bg-gray-600 text-white rounded"
        @click="onLogout"
      >
        登出
      </button>
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

interface UsageRes {
  plan: string
  quota: number
  expiration: number | null
}

const { data: subData, pending: pendingSub, refresh } =
  await useFetch<SubscriptionRes>('/api/subscription')
const { data: userData, pending: pendingUser } = await useFetch<UserRes>('/api/user')

const api = useApi()
const { data: usageData, pending: pendingUsage } = await useAsyncData(
  'usage',
  async () => {
    const res = await api.get<UsageRes>('/api/user/usage')
    return res.data
  }
)

const user = computed(() => userData.value)
const status = computed(() => subData.value?.status ?? null)

const usage = computed(() => usageData.value)
const exp = computed(() => {
  const ts = usageData.value?.expiration
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

const { openPortal } = useBilling()
const onPortal = async () => {
  await openPortal()
}

const { logout } = useAuth()
const onLogout = async () => {
  await $fetch('/api/logout', { method: 'POST' })
  logout()
  await navigateTo('/')
}
</script>
