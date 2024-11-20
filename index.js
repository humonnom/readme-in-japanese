const core = require('@actions/core');
const fs = require('fs').promises;
const OpenAI = require('openai');
const path = require('path');
const instruction = require('./openai-instruction.json');
require('dotenv').config();
const {configureGit, commitAndPush, isGitHubAction} = require('./utils/github');

const getInput = (name) => {
    if (isGitHubAction) {
        return core.getInput(name);
    }
    switch (name) {
        case 'source_file':
            return process.env.SOURCE_FILE;
        case 'api_key':
            return process.env.OPENAI_API_KEY;
        default:
            return '';
    }
};

const generateSystemCommands = async () => {
    let editorialGuidelines = '';

    try {
        const filePath = path.join(__dirname, 'japanese-editorial-guidelines.txt');
        editorialGuidelines = await fs.readFile(filePath, 'utf8');
    } catch (error) {
        console.log('Text files open failed:', error.message);
    }

    return `
${instruction["General"].map(s => `- ${s}`).join('\n')}
        
Translation Guidelines:
${instruction["Translation Guidelines"].map(s => `- ${s}`).join('\n')}

Editorial Guidelines:
${editorialGuidelines}
`
}

async function saveTranslation(content, isGitHubAction = false) {
    const outputFile = path.basename(getInput('source_file')).replace('.md', '.ja.md');

    if (isGitHubAction) {
        await fs.writeFile(outputFile, content, 'utf8');
        await commitAndPush(outputFile);
        return outputFile;
    } else {
        const outputDir = path.dirname(getInput('source_file'));
        await fs.mkdir(outputDir, {recursive: true});
        const outputPath = path.join(outputDir, outputFile);
        await fs.writeFile(outputPath, content, 'utf8');
        console.log(`Translation saved to: ${outputPath}`);
        return outputPath;
    }
}

async function run() {
    try {
        const sourceFile = getInput('source_file');
        const apiKey = getInput('api_key');

        const openai = new OpenAI({
            apiKey: apiKey
        });

        const isGitHubAction = !!process.env.GITHUB_ACTIONS;

        if (isGitHubAction) {
            await configureGit();
        }

        const content = await fs.readFile(sourceFile, 'utf8');

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: await generateSystemCommands()
                },
                {
                    role: "user",
                    content: content
                }
            ],
            temperature: 0.3,
            max_tokens: 4000
        });

        const translatedContent = response.choices[0].message.content
            .replace(/^(以下のマークダウンコンテンツを日本語に翻訳してください：\n*)/g, '')
            .replace(/^(Please translate the following markdown content to .+:\n*)/g, '')
            .trim();
        const outputFile = await saveTranslation(translatedContent, isGitHubAction);

        if (isGitHubAction) {
            core.setOutput('translated_file', outputFile);
        }
        console.log(`Translation completed: ${outputFile}`);

    } catch (error) {
        if (isGitHubAction) {
            core.setFailed(error.message);
        }
        console.error('Translation failed:', error.message);
    }
}

run();
