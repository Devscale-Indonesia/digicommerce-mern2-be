FROM node:lts

WORKDIR /app

COPY . .

RUN npm install -g pnpm@latest
RUN pnpm install
RUN pnpm build

ENV MONGO_URI="mongodb+srv://admin:adminpassword@103.13.207.242:27017/ecommerce?retryWrites=true&w=majority"

CMD ["node", "dist/main.js"]

EXPOSE 8020