<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { ref, onMounted } from 'vue'

const user = ref(null)

onMounted(() => {
  const waitForGoogle = setInterval(() => {
    if (window.google && window.google.accounts) {
      clearInterval(waitForGoogle)

      window.google.accounts.id.initialize({
        client_id: '278326876217-dqmp2tub90c03k85nqhfa32lq8ag6380.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      })

      window.google.accounts.id.renderButton(
        document.getElementById('g_id_signin'),
        { theme: 'outline', size: 'large' }
      )
    }
  }, 100)

})

function handleCredentialResponse(response) {
  const jwt = response.credential
  const decoded = parseJwt(jwt)
  user.value = {
    name: decoded.name,
    email: decoded.email,
    picture: decoded.picture,
  }

  // Use access token or send it to your backend if needed
  console.log('JWT token:', jwt)
}

function parseJwt(token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  )
  return JSON.parse(jsonPayload)
}
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <!-- This element must exist before renderButton is called -->
    <div id="g_id_signin"></div>

    <div v-if="user">
      <p>Welcome, {{ user.name }}</p>
      <img :src="user.picture" alt="profile" width="50" />
    </div>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
