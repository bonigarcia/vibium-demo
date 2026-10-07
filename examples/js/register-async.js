// Vibium JavaScript client, async API.
// Run with the app started (npm run dev): node examples/js/register-async.js
import { browser } from 'vibium'

const url = process.env.APP_URL ?? 'http://localhost:5173'

const bro = await browser.start()
try {
  const page = await bro.page()
  await page.go(url)
  await page.find('#name').fill('Ada Example')
  await page.find('#email').fill('ada@example.com')
  await page.find('#promo').fill('FRIENDS10')
  await page.find('#privacy').set()
  await page.find('button[type=submit]').click()
  console.log(await page.find('#confirmation').text())
} finally {
  await bro.stop()
}
