import { onMounted } from 'vue'

let tokenClient
let gapiInited = false
let gisInited = false

const API_KEY = 'AIzaSyDqSYjCB_t2LzKOWUCQ5VwrOg5cFxDGiKM';// import.meta.env.VITE_GOOGLE_API_KEY
const CLIENT_ID = '278326876217-dqmp2tub90c03k85nqhfa32lq8ag6380.apps.googleusercontent.com';//import.meta.env.VITE_GOOGLE_CLIENT_ID

const SCOPES = 'https://www.googleapis.com/auth/spreadsheets'

const SPREADSHEET_ID = '1MwczkE1LYjw44_1fLMxUuKLbIfc2Cp55ssTRn14ityY'

const TOKEN_STORAGE_KEY = 'google_access_token'

async function loadGapi() {
  await Promise.all([
    loadScript('https://apis.google.com/js/api.js'),
    loadScript('https://accounts.google.com/gsi/client'),
  ])

  await Promise.all([
    new Promise((resolve) => {
      const gapiInitResolve = resolve
      gapi.load('client', async () => {
        console.log('GAPI client loaded')
        await gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        })
        gapiInited = true
        gapiInitResolve()
      })
    }),
    new Promise((resolve) => {
      const gisInitResolve = resolve
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // set before requesting token
      })
      gisInited = true
      gisInitResolve()
    }),
  ])

  console.log('GAPI and GIS fully initialized')
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })
}

async function editSheet() {
  try {
    const sheetData = {
      values: [['Hello from Vue!']],
    }

    const params = {
      spreadsheetId: SPREADSHEET_ID,
      range: 'categories!A20',
      valueInputOption: 'RAW',
    }

    const response = await gapi.client.sheets.spreadsheets.values.update(params, sheetData)
    console.log('Sheet updated:', response)
    return response
  } catch (err) {
    console.error('Error updating sheet:', err)
    return err
  }
}

async function readCategories() {
  try {
    const params = {
      spreadsheetId: SPREADSHEET_ID,
      range: 'categories!A:A',
    }

    const response = await gapi.client.sheets.spreadsheets.values.get(params)
    const values = response.result.values

    console.log('Read values:', values)
    return values ? values.map(row => row[0]) : []
  } catch (err) {
    console.error('Error reading sheet:', err)
    throw err
  }
}

async function signIn(silently = true) {
  return new Promise((resolve, reject) => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)

    if (storedToken) {
      gapi.client.setToken({ access_token: storedToken })
      resolve(true);
      return true;
    }

    tokenClient.callback = async (resp) => {
      if (resp.error) {
        reject(resp)
        return false
      }
      localStorage.setItem(TOKEN_STORAGE_KEY, resp.access_token)

      resolve(true)
    }

    tokenClient.requestAccessToken(silently ? { prompt: 'none' } : {}) // silent if possible
  })
}

export {
  loadGapi,
  editSheet,
  signIn,
  readCategories
}