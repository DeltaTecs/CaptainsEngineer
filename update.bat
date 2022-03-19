git add chatters.json
git add challenges.json
git add config.json
git config --global user.name "ccasimir"
git config --global user.email "ccasimir@casimir.de"
git commit -m "temp"
git reset --hard
git pull
git reset HEAD~
echo Update finished, starting bot...
Start "CaptainsEngineer" /d "D:\dev\prgm\Nodejs" "node.exe bot.js"
pause