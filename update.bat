powershell -Command "Invoke-WebRequest https://github.com/DeltaTecs/CaptainsEngineer/archive/refs/heads/main.zip -OutFile update.zip"
powershell -Command "tar -xf update.zip"
md temp
xcopy challenges.json temp /q /r /y
xcopy config.json temp /q /r /y
xcopy chatters.json temp /q /r /y
xcopy credentials.json temp /q /r /y
xcopy google-key.json temp /q /r /y
cleanup.bat
