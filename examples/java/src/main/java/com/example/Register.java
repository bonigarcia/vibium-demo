package com.example;

import com.vibium.Vibium;

/**
 * Vibium Java client (sync API).
 * Run with the app started (npm run dev): mvn -q compile exec:java
 */
public class Register {

    public static void main(String[] args) {
        String url = System.getenv().getOrDefault("APP_URL", "http://localhost:5173");

        var bro = Vibium.start();
        try {
            var page = bro.page();
            page.go(url);
            page.find("#name").fill("Ada Example");
            page.find("#email").fill("ada@example.com");
            page.find("#promo").fill("FRIENDS10");
            page.find("#privacy").check(); // set() in nightly builds
            page.find("button[type=submit]").click();
            System.out.println(page.find("#confirmation").text());
        } finally {
            bro.stop();
        }
    }
}
