FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml .npmrc ./

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

COPY . .

# Compilar con SWC
RUN pnpm build

CMD ["node", "dist/main.js"]
