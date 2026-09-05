FROM node:20-slim

# 安装 openssl 和其它可能需要的依赖
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install --production

# 复制项目代码
COPY . .

# 暴露应用端口
EXPOSE 7001

# 启动应用
CMD ["node", "app.js"]
