# vibium-demo

Demo for the talk *From Selenium to Vibium: when agents write the code, who checks it?*

The app is the registration page of a fictional event, "Acme Testing Conference 2026", built with plain HTML, CSS and JavaScript, Vite and Vitest. During the demo, a coding agent (Claude Code with the Vibium MCP server) implements a ticket, checks its work in a real browser, and a different model verifies the result with `vibium check`.

## Requirements

- Node.js 18+
- [Vibium](https://github.com/VibiumDev/vibium) on the `PATH`:
  - `npm install -g vibium` gives you the CLI, the MCP server and the client APIs.
  - `vibium run` and `vibium check` currently need a nightly build: download the binary for your platform from a `nightly-*` pre-release on the [Vibium releases page](https://github.com/VibiumDev/vibium/releases).
- For `vibium check`: an AI provider configured with `vibium setup ai` (OpenAI, Anthropic, Google, xAI, OpenAI-compatible such as OpenRouter, or local). Check it with `vibium ready ai`.

## Start the app

```
npm install
npm run dev
```

Then open http://localhost:5173.

## Tests

```
npm test            # unit tests (Vitest)
npm run test:e2e    # end-to-end tests with the Vibium JS client (app must be running)
```

The end-to-end tests are deterministic: they use the Vibium API, with no AI involved.

## The demo

The ticket for the agent:

> Add a fixed banner at the bottom of the screen announcing the EARLYBIRD promo code (20% off until 31 October 2026), and make the code work.

1. **Part 1 – An agent with eyes.** Start from the `start` tag (`git switch -c live start`), run `npm run dev`, open `claude` and paste the ticket. The project's `.mcp.json` registers `vibium mcp`, and `CLAUDE.md` asks the agent to check visible changes in a real browser.
2. **Part 2 – Independent verification.** When the agent is done, run `demo\verify.cmd` (Windows) or `demo/verify.sh` (macOS/Linux). It checks three claims with `vibium check`: two that should pass, and a control: a claim we know is false (the banner has no close button), which must fail. A verifier that can't say FAIL tells you nothing when it says PASS. Recordings are saved in `evidence/`.
3. **Part 3 – Evidence, not trust.** The verifier's PASS is a claim too, so every check saves a recording. Open https://player.vibium.dev and drop `evidence/claim-2-<label>.zip` into it to see what the verifier did, step by step. You can also ask a new question about a saved recording, without the app or a browser:

   ```
   vibium check -i evidence/claim-2-<label>.zip "After submitting, no part of the Register button is covered by the banner"
   ```

The `solution` tag contains the code from one of the agent's runs. Each run fixes the overlap in a slightly different way.

## API examples

The same flow (register with the FRIENDS10 code) with each Vibium client, in [`examples/`](examples). They use the stable release (26.8.21); in newer builds, `check()` on a checkbox is renamed `set()`, because `check` is now the AI verification.

> **Java note:** the Java client looks for the `vibium` binary on the `PATH` before using its bundled one. If a nightly build is on your `PATH`, the 26.8.21 client and the nightly binary don't match (`Unknown command 'vibium:element.check'`). Point the client to the stable binary installed by `npm install`, in the same terminal:
>
> ```
> set VIBIUM_BIN_PATH=%CD%\..\..\node_modules\@vibium\win32-x64\bin\vibium.exe
> ```
>
> (macOS/Linux: `export VIBIUM_BIN_PATH=$PWD/../../node_modules/@vibium/<platform>-<arch>/bin/vibium`)

| Client | Run (with the app started) |
|---|---|
| JavaScript, async | `node examples/js/register-async.js` |
| JavaScript, sync | `node examples/js/register-sync.js` |
| Python, sync | `pip install -r examples/python/requirements.txt` then `python examples/python/register_sync.py` |
| Python, async | `python examples/python/register_async.py` |
| Java, sync | `cd examples/java` then `mvn -q compile exec:java` (see the Java note above) |

## Structure

- `index.html`: the page (event information and registration form)
- `src/registration.js`: pure functions for validation and price calculation
- `src/main.js`: DOM handling
- `src/registration.test.js`: unit tests
- `e2e/`: end-to-end tests with the Vibium API
- `examples/`: Vibium API examples in JavaScript, Python and Java
- `demo/`: scripts for Part 2 of the demo
- `.mcp.json`, `CLAUDE.md`: agent configuration

## License

Apache-2.0
