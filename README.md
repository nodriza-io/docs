# Nodriza Docs

## http://docs.nodriza.io

Nodriza docs spa served from S3 Bucket - docs.nodriza.io

### Install

$ npm run install

### Dev

Watch for static/html changes and generate index.json plus webpack hotreload

$ npm run dev

### Build production

$ npm run build

### Deploy to S3 Bucket

First time copy ./env/env.template to ./env/env and provide the bucket name and AWS Credentials

$ npm run deploy

