# Acme Testing Conference 2026: registration page

## Commands
- `npm run dev` starts the app at http://localhost:5173
- `npm test` runs the unit tests (Vitest)

## Code
- Pure logic goes in `src/registration.js`; DOM handling goes in `src/main.js`.
- Keep the code short and readable: it is shown on screen during a talk.
- Do not add anything that was not requested.

## Definition of done for changes the user can see
Unit tests are necessary but not enough.
1. Run `npm test`. All tests must pass.
2. Start the dev server and open the page in a real browser with the Vibium tools.
3. Go through the complete user flow as a user would, including filling in and submitting the form.
4. Take a screenshot as evidence and report what you checked in the browser.

Never claim that a visible change works unless you have seen it working in the browser.
