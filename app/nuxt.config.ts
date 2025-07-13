import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'path'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  typescript: {
    strict: true
  },
  alias: {
    '#utils': resolve(__dirname, 'server/utils')
  },
  runtimeConfig: {
    public: {
      GA_ID: process.env.GA_ID,
      AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
      AUTH_AUTHORIZE_URL: process.env.AUTH_AUTHORIZE_URL,
      AUTH_TOKEN_URL: process.env.AUTH_TOKEN_URL,
      AUTH_REDIRECT_URI: process.env.AUTH_REDIRECT_URI
    },

    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET

  }
})
