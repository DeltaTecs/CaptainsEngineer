xcopy CaptainsEngineer-main\* . /q /y /exclude:excludecp.txt
xcopy temp\* . /q /h /i /c /k /e /r /y
DEL /F /S /Q "update.zip"
rmdir /q /s temp
rmdir /q /s CaptainsEngineer-main
powershell -Command "node bot.js"
pause