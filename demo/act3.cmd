@echo off
rem Act 3: independent verification of claims with "vibium check".
rem Usage, from the repository root with "npm run dev" running:
rem   demo\act3.cmd [label]
rem Each run needs new recording names, so pass a different label each time (default: run).

set LABEL=%1
if "%LABEL%"=="" set LABEL=run
set BASE=http://localhost:5173
set OUT=..\vibium-evidence

vibium check "A banner at the bottom of the screen announces the promo code EARLYBIRD with 20%% off until 31 October 2026" --base-url %BASE% -o %OUT%\claim-1-%LABEL%.zip
pause

vibium check "Registering with name Ada Example, email ada@example.com, a General ticket, promo code EARLYBIRD and the privacy policy accepted shows Registration confirmed with a final price of 96 euros" --base-url %BASE% -o %OUT%\claim-2-%LABEL%.zip
pause

vibium check "The user can dismiss the promo banner" --base-url %BASE% -o %OUT%\claim-3-%LABEL%.zip
