@echo off
rem Act 3: independent verification of claims with "vibium check".
rem Usage, from the repository root with "npm run dev" running:
rem   demo\act3.cmd [label]
rem Recordings are never overwritten, so each run needs a new label.
rem Without a label, the current date and time are used.

set LABEL=%1
if "%LABEL%"=="" for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set LABEL=%%i
set BASE=http://localhost:5173
set OUT=..\vibium-evidence
echo Label: %LABEL%

echo [start %time%]
vibium check "A banner at the bottom of the screen announces the promo code EARLYBIRD with 20%% off until 31 October 2026" --base-url %BASE% -o %OUT%\claim-1-%LABEL%.zip
echo [end %time%]
pause

echo [start %time%]
vibium check "Registering with name Ada Example, email ada@example.com, a General ticket, promo code EARLYBIRD and the privacy policy accepted shows Registration confirmed with a final price of 96 euros" --base-url %BASE% -o %OUT%\claim-2-%LABEL%.zip
echo [end %time%]
pause

echo [start %time%]
vibium check "The user can dismiss the promo banner" --base-url %BASE% -o %OUT%\claim-3-%LABEL%.zip
echo [end %time%]
