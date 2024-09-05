FROM node:lts

WORKDIR /app

COPY . .

RUN npm install -g pnpm@latest
RUN pnpm install
RUN pnpm build

ENV MONGO_URI=$MONGO_URI

CMD ["node", "dist/main.js"]

EXPOSE 8020