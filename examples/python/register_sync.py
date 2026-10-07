"""Vibium Python client, sync API.

Run with the app started (npm run dev): python examples/python/register_sync.py
"""
import os

from vibium import browser

URL = os.environ.get("APP_URL", "http://localhost:5173")

bro = browser.start()
try:
    page = bro.page()
    page.go(URL)
    page.find("#name").fill("Ada Example")
    page.find("#email").fill("ada@example.com")
    page.find("#promo").fill("FRIENDS10")
    page.find("#privacy").set()
    page.find("button[type=submit]").click()
    print(page.find("#confirmation").text())
finally:
    bro.stop()
