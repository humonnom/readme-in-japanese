# README AI Translator Action

This GitHub Action automatically translates your README.md file to different languages using OpenAI's GPT-4, with a
special focus on Japanese language translation.

## Introduction

The README AI Translator Action simplifies the process of translating README files to japanese language, leveraging
the power of OpenAI's GPT-4 technology.

By translating your README.md to Japanese, you can reach over [121 million](https://pontoon.mozilla.org/ja/)
Japanese-speaking developers and users, significantly expanding your project's accessibility in one of the world's
largest tech communities.

<!--
### Japanese-Specific Notes

This action has been optimized with special considerations for Japanese translation:

- Enhanced handling of Japanese language nuances
- Improved context preservation during translation
- Specialized processing for markdown in Japanese context

### Other Features

- **Markdown Preservation**: Maintains original markdown formatting during translation
- **Easy Integration**: Simple setup with minimal configuration
-->

## Requirements

- Valid OpenAI API Key

<!--
## Documentation

See the official documentation for more information:
- English: [Link to English documentation]
- Japanese: [Link to Japanese documentation]
-->

## Usage

```yaml
- uses: humonnom/translateme@v1
  with:
    # Path to the source README file
    #
    # Optional
    # Default: README.md
    source_file: ''

    # OpenAI API Key for translation 
    #
    # Required
    api_key: ''  
```

* Destination file
    - The destination translated files are saved in the **same directory** as the source file
    - File name: README.ja.md

## Scenarios

* [Translate with Specific Source File](#translate-with-specific-source-file)

### Translate with default source file

```yaml
- uses: humonnom/translateme@v1
  with:
    api_key: ${{ secrets.OPENAI_API_KEY }}
```

### Translate with Specific Source File

```yaml
- uses: humonnom/translateme@v1
  with:
    source_file: docs/README.md # Path to the source README file
    api_key: ${{ secrets.OPENAI_API_KEY }}
```

## Examples

* [Translate README to Japanese when README.md is updated](#translate-readme-to-japanese-when-readmemd-is-updated)

### Translate README to Japanese when README.md is updated

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

<!--
## Contributing

Please check CONTRIBUTING.md before making a contribution.
-->

## Versioning

This action follows the [Semantic Versioning](https://semver.org/) convention for versioning.

### Version Management

When specifying the action version, you have two approaches:

1. **Major Version Tracking**:
    - Using `v1` will automatically use the latest patch release within the v1 major version
    - Example: If the latest release is v1.0.7, `v1` will use v1.0.7
    - When v1.0.8 is released, it will automatically update to v1.0.8

2. **Specific Version Pinning**:
    - For precise version control, specify the full version (e.g., `v1.0.7`)
    - This locks the action to exactly that version, preventing automatic updates

## License

The scripts and documentation in this project are released under the MIT License

