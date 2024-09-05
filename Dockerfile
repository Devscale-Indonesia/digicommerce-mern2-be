FROM node:lts

WORKDIR /app

COPY . .

RUN npm install -g pnpm@latest
RUN pnpm install
RUN pnpm build

CMD ["node", "dist/main.js"]

EXPOSE 8020