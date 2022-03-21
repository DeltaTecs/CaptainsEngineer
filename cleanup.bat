xcopy CaptainsEngineer-main\* . /q /y /exclude:excludecp.txt
pause
xcopy temp\* . /q /h /i /c /k /e /r /y
pause
DEL /F /S /Q "update.zip"
pause
rmdir /q /s temp
pause
rmdir /q /s CaptainsEngineer-main
pause
powershell -Command "node bot.js"
pause