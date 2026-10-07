"""Vibium Python client, async API.

Run with the app started (npm run dev): python examples/python/register_async.py
"""
import asyncio
import os

from vibium.async_api import browser

URL = os.environ.get("APP_URL", "http://localhost:5173")


async def main():
    bro = await browser.start()
    try:
        page = await bro.page()
        await page.go(URL)
        await (await page.find("#name")).fill("Ada Example")
        await (await page.find("#email")).fill("ada@example.com")
        await (await page.find("#promo")).fill("FRIENDS10")
        await (await page.find("#privacy")).set()
        await (await page.find("button[type=submit]")).click()
        print(await (await page.find("#confirmation")).text())
    finally:
        await bro.stop()


asyncio.run(main())
