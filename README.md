<a href="https://aibloom.vercel.app">
  <img alt="AI Bloom – Generate mesmerizing AI spiral art with one click." src="/app/opengraph-image.png">
  <h1 align="center">AI Bloom</h1>
</a>

<p align="center">
  Generate mesmerizing AI spiral art with one click. Powered by Vercel and Pollinations.
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#author"><strong>Author</strong></a>
</p>
<br/>

## Introduction

**AI Bloom** is an AI-powered application that allows you to create mesmerizing spiral art inspired by nature and technology with just one click. The app leverages the power of **Vercel** and **Pollinations** to deliver dynamic, creative visuals.

## Tech Stack

- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js Server Actions](https://nextjs.org/docs/app/api-reference/functions/server-actions)
- [Bun](https://bun.sh/) for compilation
- [Vercel Blob](https://vercel.com/storage/blob) for image storage
- ~~[Vercel KV](https://vercel.com/storage/kv) for redis~~
- [`promptmaker`](https://github.com/zeke/promptmaker) lib by @zeke for generating random prompts
- [Pollinations API](https://pollinations.ai/) for AI-powered art generation

## Deploy Your Own

You can deploy this template to Vercel with the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://stey.me/aibloom-deploy)

### Setup Instructions:

1. Set up **Pollinations API** no key required.
2. Configure environment variables in Vercel:
    - ~~`VERCEL_KV_URL`: For redis storage.~~
    - `VERCEL_BLOB_URL`: For image storage.

## Author

- Diep Do ([@diepdo](https://github.com/diepdo1810))
