#!/bin/bash
# 梦途 · 本地启动脚本（Mac）
# 双击此文件即可启动网站

cd "$(dirname "$0")"

# 检查 Node.js 是否已安装
if ! command -v node &> /dev/null; then
  osascript -e 'display alert "启动失败" message "请先安装 Node.js（前往 https://nodejs.org 下载）"'
  exit 1
fi

echo "正在安装依赖（首次运行需要约1分钟）..."
npm install --silent

echo "正在构建..."
npm run build --silent

echo "启动本地服务器..."

# 2秒后自动打开浏览器
(sleep 2 && open "http://localhost:4000") &

# 弹出提示告知地址
osascript -e 'display notification "网站已在 http://localhost:4000 启动，浏览器将自动打开" with title "梦途 · Dreamways" subtitle "本地预览"' &

# 启动服务器（优先用全局 serve，没有则用 npx）
if command -v serve &> /dev/null; then
  serve dist -l 4000
else
  npx serve dist -l 4000
fi
