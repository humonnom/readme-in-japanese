const core = require('@actions/core');
const exec = require('@actions/exec');
const fs = require('fs').promises;
const OpenAI = require('openai');
const path = require('path');
const styleGuide = require('./style-guide.json');

const generateSystemCommands = async () => {
    let editorialGuidelines = '';

    try {
        const filePath = path.join(__dirname, 'editorial-guidelines.txt');
        editorialGuidelines = await fs.readFile(filePath, 'utf8');
    } catch (error) {
        console.log('Text files open failed:', error.message);
    }

    const basic =
        `You are a professional translator.
Translate the given markdown content to japanese while preserving all markdown formatting, code blocks, and links.
Do not include the translation instruction in your response.
Start directly with the translated content.`

    const style =
        `
Translation Guidelines:
${styleGuide["Translation Guidelines"].map(s => `- ${s}`).join('\n')}

Editorial Guidelines:
${editorialGuidelines}
`

    return [basic, style].join('\n');
}

async function configureGit() {
    await exec.exec('git', ['config', '--global', 'user.email', 'github-actions[bot]@users.noreply.github.com']);
    await exec.exec('git', ['config', '--global', 'user.name', 'github-actions[bot]']);
}

async function commitAndPush(outputFile) {
    try {
        await exec.exec('git', ['add', outputFile]);
        try {
            await exec.exec('git', ['commit', '-m', `Update translation: ${outputFile}`]);
        } catch (error) {
            console.log('No changes to commit');
            return;
        }
        await exec.exec('git', ['push']);
    } catch (error) {
        throw new Error(`Failed to commit and push changes: ${error.message}`);
    }
}

async function run() {
    try {
        const sourceFile = core.getInput('source_file');
        const apiKey = core.getInput('api_key');

        const openai = new OpenAI({
            apiKey: apiKey
        });

        await configureGit();

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
        const outputFile = 'README.ja.md';
        await fs.writeFile(outputFile, translatedContent, 'utf8');

        await commitAndPush(outputFile);

        core.setOutput('translated_file', outputFile);
        console.log(`Translation completed and pushed: ${outputFile}`);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
