@echo off
chcp 65001 >nul
title A Life in Songs · 启动中...

cd /d "%~dp0"

:: 检查 Node.js 是否已安装
where node >nul 2>&1
if errorlevel 1 (
    echo 错误：请先安装 Node.js，前往 https://nodejs.org 下载
    pause
    exit /b 1
)

echo 正在安装依赖（首次运行需要约1分钟）...
call npm install --silent

echo 正在构建...
call npm run build

echo 启动本地服务器...
start http://localhost:4000
npx serve dist -l 4000

pause
