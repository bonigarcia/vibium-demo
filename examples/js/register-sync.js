// Vibium JavaScript client, sync API.
// Run with the app started (npm run dev): node examples/js/register-sync.js
import { browser } from 'vibium/sync'

const url = process.env.APP_URL ?? 'http://localhost:5173'

const bro = browser.start()
try {
  const page = bro.page()
  page.go(url)
  page.find('#name').fill('Ada Example')
  page.find('#email').fill('ada@example.com')
  page.find('#promo').fill('FRIENDS10')
  page.find('#privacy').check() // set() in nightly builds
  page.find('button[type=submit]').click()
  console.log(page.find('#confirmation').text())
} finally {
  bro.stop()
}
