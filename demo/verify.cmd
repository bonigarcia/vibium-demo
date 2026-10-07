@echo off
rem Part 2 of the demo: independent verification with "vibium check".
rem Run it from the repository root while "npm run dev" serves the app.
rem   demo\verify.cmd [label]
rem Recordings go to evidence\ and are never overwritten: each run needs a new
rem label. Without one, the current date and time are used.
setlocal

set LABEL=%1
if "%LABEL%"=="" for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set LABEL=%%i
set BASE=http://localhost:5173
set OUT=evidence
if not exist %OUT% mkdir %OUT%
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

echo.
echo Part 3: drop %OUT%\claim-2-%LABEL%.zip into https://player.vibium.dev
pause
start "" https://player.vibium.dev
explorer /select,"%CD%\%OUT%\claim-2-%LABEL%.zip"
endlocal
