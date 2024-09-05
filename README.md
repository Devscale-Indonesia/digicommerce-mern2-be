# Setup DB

```bash
docker run -d \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=adminpassword \
  -p 27017:27017 \
  mongo
```

# Setup CI

```yaml
name: CI/CD Pipeline Backend App

on:
    push:
        branches:
            - main

jobs:
    build:
        runs-on: ubuntu-latest
        steps:
            - name: Checkout
              uses: actions/checkout@v3

            - name: Setup Node
              uses: actions/setup-node@v3
              with:
                  node-version: 20

            - name: Install dependencies
              run: npm install

            - name: Build
              run: npm run build

            - name: Deploy
              uses: peaceiris/actions-gh-pages@v3
              with:
                  github_token: ${{ secrets.GITHUB_TOKEN }}
                  publish_dir: ./build
```
