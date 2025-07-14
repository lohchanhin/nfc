<template>
  <div class="p-4 space-y-4">
    <h1 class="text-xl font-bold mb-4">會員儀表板</h1>

    <!-- 載入指示 -->
    <div v-if="pendingUser || pendingSub || pendingUsage">載入中...</div>

    <!-- 主要內容 -->
    <div v-else class="space-y-4">
      <!-- 會員資料 -->
      <div class="bg-gray-50 p-4 rounded shadow">
        <h2 class="font-semibold mb-2">會員資料</h2>
        <p>Email：{{ user?.email || '—' }}</p>
      </div>

      <!-- 方案資訊 -->
      <div class="bg-gray-50 p-4 rounded shadow">
        <h2 class="font-semibold mb-2">方案資訊</h2>

        <!-- 有訂閱時顯示詳情 -->
        <template v-if="status">
          <p>方案：{{ usage?.plan }}</p>
          <p>額度：{{ usage?.quota }}</p>
          <p v-if="exp">到期日：{{ exp }}</p>

          <button
            v-if="status !== 'canceled'"
            @click="onCancel"
            class="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            取消訂閱
          </button>
          <button
            @click="onPortal"
            class="mt-4 ml-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            管理訂閱
          </button>
        </template>

        <!-- 無訂閱顯示免費方案提示 -->
        <template v-else>
          <p>您目前使用 <strong>免費方案</strong>，尚未建立付費訂閱。</p>
          <NuxtLink
            to="/pricing"
            class="mt-2 inline-block text-blue-600 underline"
          >
            立即升級 →
          </NuxtLink>
        </template>
      </div>

      <!-- 登出 -->
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
// --------------------------------------------------
// 導航守衛：需登入才能查看
// --------------------------------------------------
definePageMeta({ middleware: 'auth' })

// --------------------------------------------------
// 型別定義
// --------------------------------------------------
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

// --------------------------------------------------
// API 請求
// --------------------------------------------------
const { data: subData, pending: pendingSub, refresh } = await useFetch<SubscriptionRes>(
  '/api/subscription'
)

const { data: userData, pending: pendingUser } = await useFetch<UserRes>('/api/user')

// 取得用量資料，直接使用 useFetch
const {
  data: usageData,
  pending: pendingUsage
} = await useFetch<UsageRes>('/api/user/usage', {
  key: () => `usage-${userData.value?.id ?? 'anon'}`,
  server: true,
  lazy: false
})

// --------------------------------------------------
// 計算屬性
// --------------------------------------------------
const user = computed(() => userData.value as UserRes | null)
const status = computed(() => subData.value?.status ?? null)
const usage = computed(() => usageData.value as UsageRes | null | undefined)
const exp = computed(() => {
  const ts = usage.value?.expiration
  return ts ? new Date(ts * 1000).toLocaleDateString('zh-TW') : null
})

// --------------------------------------------------
// 動作
// --------------------------------------------------
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
