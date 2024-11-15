# README AI Translator Action

This GitHub Action automatically translates your README.md file to different languages using OpenAI's GPT-4, with a special focus on Japanese language translation.

## Features

- **Markdown Preservation**: Maintains original markdown formatting during translation
- **Multi-language Support**: Translates README to multiple target languages
- **Easy Integration**: Simple setup with minimal configuration
- **High-Quality Translations**: Leverages OpenAI's GPT-4 for accurate translations

## Version Management

When specifying the action version, you have two approaches:

1. **Major Version Tracking**: 
   - Using `v1` will automatically use the latest patch release within the v1 major version
   - Example: If the latest release is v1.0.7, `v1` will use v1.0.7
   - When v1.0.8 is released, it will automatically update to v1.0.8

2. **Specific Version Pinning**:
   - For precise version control, specify the full version (e.g., `v1.0.7`)
   - This locks the action to exactly that version, preventing automatic updates

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
        uses: humonnom/translateme@v1
        with:
          api_key: ${{ secrets.OPENAI_API_KEY }}
```

## Configuration Options

### Inputs

| Option | Description | Required | Default |
|--------|-------------|----------|---------|
| `source_file` | Path to the source README file | No | `README.md` |
| `api_key` | OpenAI API Key for translation | Yes | - |

### File Handling

- The destination translated files are saved in the **same directory** as the source file
- Default behavior creates translated README files alongside the original

## Japanese-Specific Notes

This action has been optimized with special considerations for Japanese translation:
- Enhanced handling of Japanese language nuances
- Improved context preservation during translation
- Specialized processing for markdown in Japanese context

## Branding

- **Icon**: Book
- **Color**: Blue

## Requirements

- Node.js 20.x
- Valid OpenAI API Key

<!--

## License

-->
