@echo off
REM 声明采用UTF-8编码
chcp 65001
if %1 == "" ( exit  ) else ( 
    echo %date%[云贝小程序]:%1 >> c:\work.txt

)
cd %~dp0 &
git add . &
git commit -m %1  &
git pull &
git push &
