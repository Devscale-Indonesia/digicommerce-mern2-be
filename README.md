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

            - name: Install Dependencies
              run: npm install

            - name: Check Linting
              run: npm run lint

            - name: Build Docker Image
              run: docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/digicommerce-backend .

            - name: Push Docker Image
              run: docker login -u ${{ secrets.DOCKERHUB_USERNAME }} -p ${{ secrets.DOCKERHUB_TOKEN }} && docker push ${{ secrets.DOCKERHUB_USERNAME }}/digicommerce-backend

            - name: Setup SSH
              run: |
                  mkdir -p ~/.ssh
                  echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
                  chmod 600 ~/.ssh/id_rsa
                  ssh-keyscan -H 103.13.207.242 >> ~/.ssh/known_hosts

              env:
                  SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}

            - name: Deploy code via SSH
              run: |
                  ssh indrazm@103.13.207.242 "
                    docker pull indrazm/digicommerce-backend:latest && \
                    docker stop indrazm/digicommerce-backend && \
                    docker rm indrazm/digicommerce-backend && \
                    docker run -d --name indrazm/digicommerce-backend \
                    -p 8000:8000 indrazm/digicommerce-backend:latest
                  "
```
