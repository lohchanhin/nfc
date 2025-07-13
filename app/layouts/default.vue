<template>
  <div>
    <header class="p-4 bg-gray-100 flex gap-4">
      <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
      <NuxtLink to="/login" class="hover:underline">Login</NuxtLink>
      <NuxtLink to="/register" class="hover:underline">Register</NuxtLink>
      <NuxtLink to="/dashboard" class="hover:underline">Dashboard</NuxtLink>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
