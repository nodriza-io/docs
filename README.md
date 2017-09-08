# Nodriza Manual

Nodriza manual is served from S3 Bucket (manual.nodruza.io) and distributed through AWS CloudFront deployment using HTTPS so the manual can used by a conventional browser visiting https://manual.nodriza.io or by webclients in help section.

## Install

$ npm run install

### Work on manual

$ npm run watch

If something change and credentials detected

### Publish a new distribution

$ npm run upload

This will sync with AWS S3 Public bucket