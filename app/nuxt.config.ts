import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'path'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  typescript: {
    strict: true
  },
  alias: {
    '#utils': resolve(__dirname, 'server/utils')
  },
  runtimeConfig: {
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET
  }
})
