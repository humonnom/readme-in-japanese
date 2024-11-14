# README AI Translator Action

This GitHub Action automatically translates your README.md file to different languages using OpenAI's GPT-4.

## Features

- Preserves markdown formatting
- Supports multiple languages
- Easy to integrate
- Uses OpenAI's GPT-4 for high-quality translations

## Usage

```yaml
name: Translate README

on:
  push:
    paths:
      - 'README.md'

jobs:
  translate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Translate README
        uses: your-username/readme-translator-action@v1
        with:
          api_key: ${{ secrets.OPENAI_API_KEY }}
          target_language: 'ja'
