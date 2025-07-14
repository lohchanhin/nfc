<template>
  <div class="flex">
    <aside class="p-4 bg-gray-100 flex flex-col gap-4">
      <NuxtLink to="/" class="hover:underline">首頁</NuxtLink>
      <NuxtLink to="/login" class="hover:underline">登入</NuxtLink>
      <NuxtLink to="/register" class="hover:underline">註冊</NuxtLink>
      <NuxtLink to="/dashboard" class="hover:underline">儀表板</NuxtLink>
    </aside>
    <main>
      <slot />
    </main>
  </div>
</template>
