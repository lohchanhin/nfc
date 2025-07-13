export default defineEventHandler((event) => {
  setHeader(event, 'Access-Control-Allow-Origin', 'https://billing.example.com')
  setHeader(event, 'Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  setHeader(event, 'Access-Control-Allow-Headers', 'Authorization,Content-Type')
  setHeader(event, 'Access-Control-Allow-Credentials', 'true')

  if (event.node.req.method === 'OPTIONS') {
    setResponseStatus(event, 200)
    return ''
  }
})
