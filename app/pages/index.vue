<template>
  <div>
    <!-- Hero -->
    <section
      class="h-screen flex flex-col justify-center items-center text-center px-4"
      style="max-height:600px"
    >
      <h1 class="text-3xl font-bold mb-4">一觸獲五星好評</h1>
      <p class="mb-6 text-gray-600">掃描 NFC 標籤，立即收集 Google 評論</p>
      <button
        class="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        @click="goCheckout"
      >
        開始使用 (RM199)
      </button>
    </section>

    <!-- Social Proof -->
    <section class="py-12 bg-gray-50 text-center">
      <h2 class="text-xl font-semibold mb-6">
        超過 <CountUp :end="200" /> 家商家信任
      </h2>
      <div class="flex flex-wrap justify-center gap-4">
        <!-- 假 Logo -->
        <img
          src="https://placehold.co/120x32?text=Logo+1"
          alt="logo 1"
          class="h-8"
        />
        <img
          src="https://placehold.co/120x32?text=Logo+2"
          alt="logo 2"
          class="h-8"
        />
        <img
          src="https://placehold.co/120x32?text=Logo+3"
          alt="logo 3"
          class="h-8"
        />
      </div>
    </section>

    <!-- Features -->
    <section class="py-12 px-4 text-center">
      <h2 class="text-xl font-semibold mb-6">功能亮點</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div>
          <img
            src="https://placehold.co/80x80?text=Icon+1"
            alt="免打字"
            class="mx-auto h-20"
          />
          <h3 class="font-bold mt-4">NFC 免打字</h3>
          <p class="text-gray-600">輕鬆掃描即跳轉評價</p>
        </div>
        <div>
          <img
            src="https://placehold.co/80x80?text=Icon+2"
            alt="分析圖表"
            class="mx-auto h-20"
          />
          <h3 class="font-bold mt-4">後台圓餅圖</h3>
          <p class="text-gray-600">即時追蹤評論分佈</p>
        </div>
        <div>
          <img
            src="https://placehold.co/80x80?text=Icon+3"
            alt="OTA"
            class="mx-auto h-20"
          />
          <h3 class="font-bold mt-4">OTA 編輯</h3>
          <p class="text-gray-600">隨時更新連結內容</p>
        </div>
      </div>
    </section>

    <!-- Flow -->
    <section class="py-12 bg-gray-50 text-center px-4">
      <h2 class="text-xl font-semibold mb-6">簡易流程</h2>
      <ol class="space-y-2">
        <li>① 掃板</li>
        <li>② 選平台</li>
        <li>③ 留評</li>
        <li>④ 分析圖表</li>
      </ol>
    </section>

    <!-- Pricing -->
    <section class="py-12 px-4 text-center">
      <h2 class="text-xl font-semibold mb-6">方案價格</h2>
      <div class="flex flex-col md:flex-row justify-center gap-6">
        <div class="border p-6 rounded shadow w-64 mx-auto">
          <h3 class="font-bold mb-2">一次性方案</h3>
          <p class="text-3xl font-bold mb-4">RM199</p>
          <p class="mb-4">含兩片 NFC 板及設定</p>
          <button
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            @click="goCheckout"
          >
            立即購買
          </button>
        </div>
        <div class="border p-6 rounded shadow w-64 mx-auto">
          <h3 class="font-bold mb-2">月租方案</h3>
          <p class="text-3xl font-bold mb-4">RM19.9</p>
          <p class="mb-4">每月收費，隨時取消</p>
          <button
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            @click="goCheckout"
          >
            立即訂閱
          </button>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-12 bg-gray-50 px-4">
      <h2 class="text-xl font-semibold mb-6 text-center">常見問題</h2>
      <div class="max-w-2xl mx-auto space-y-2">
        <FaqItem question="運送範圍？">馬來西亞全境</FaqItem>
        <FaqItem question="如何取消訂閱？">登入 Dashboard 可隨時取消</FaqItem>
        <FaqItem question="可以加購板嗎？">可，單片 RM50</FaqItem>
        <FaqItem question="需要綁約嗎？">無需綁約，自由取消</FaqItem>
        <FaqItem question="提供保固嗎？">板子一年保固</FaqItem>
        <FaqItem question="支援哪些平台？">Google、Facebook 等</FaqItem>
      </div>
      <div class="text-center mt-8">
        <button
          class="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          @click="goCheckout"
        >
          馬上體驗
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-6 text-center text-sm text-gray-500">
      © 2025 NFC 評論系統
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'NFC 評論系統 - 一觸獲五星好評',
  meta: [
    {
      name: 'description',
      content:
        'NFC 評論系統協助商家快速提升 Google Review 數量與評分。'
    }
  ],
  script: [
    { src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXX', async: true },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXX');
      `,
      type: 'text/javascript'
    }
  ]
})

const loading = ref(false)
interface CheckoutSessionRes {
  url: string
}

const goCheckout = async () => {
  if (loading.value) return
  loading.value = true
  try {
    const { url } = await $fetch<CheckoutSessionRes>(
      '/api/create-checkout-session',
      { method: 'POST' }
    )
    window.location.href = url
  } finally {
    loading.value = false
  }
}
</script>
