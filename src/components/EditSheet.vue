<template>
    <div>
        <div v-if="isLoading" class="loader-container">
            <div class="loader"></div>
            <p>Loading Google API...</p>
        </div>
        <div v-else-if="!isSignedIn" class="sign-in-container">
            <button @click="doSignIn">Sign In</button>
        </div>
        <div v-else>
            <button @click="loadCategories">Update Sheet</button>
            <!-- Your app UI goes here -->
            <p>GAPI ready, continue</p>
        </div>

    </div>
</template>

<script setup>
import { editSheet, loadGapi, signIn, readCategories } from '../services/sheetService'
import { onMounted, ref } from 'vue'

const isSignedIn = ref(false)
const isLoading = ref(true)


onMounted(() => {
    console.log('Mounted sheetService')
        ; (async () => {
            await loadGapi()
            console.log('GAPI loaded')
            try{
                isSignedIn.value = await signIn()
            } catch(err){
                console.error('Error signing in:', err)
            }
            isLoading.value = false
            // enable buttons or continue logic
        })()
})
async function doSignIn(){
    isSignedIn.value = await signIn(false)
}

async function loadCategories(){
    const categories = await readCategories()
    console.log('Categories loaded:', categories)
}
</script>