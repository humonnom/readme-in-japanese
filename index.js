const core = require('@actions/core');
const fs = require('fs').promises;
const OpenAI = require('openai');

async function run() {
    try {
        // 입력 파라미터 가져오기
        const sourceFile = core.getInput('source_file');
        // const targetLanguage = core.getInput('target_language');
        const targetLanguage = 'ja';
        const apiKey = core.getInput('api_key');

        const openai = new OpenAI({
            apiKey: apiKey
        });

        // README 파일 읽기
        const content = await fs.readFile(sourceFile, 'utf8');

        // 번역 수행
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: `You are a professional translator. Translate the given markdown content to ${targetLanguage} while preserving all markdown formatting, code blocks, and links.`
                },
                {
                    role: "user",
                    content: `Please translate the following markdown content to ${targetLanguage}:\n\n${content}`
                }
            ],
            temperature: 0.3,
            max_tokens: 4000
        });

        // 번역된 내용 저장
        const translatedContent = response.choices[0].message.content;
        const outputFile = `README.${targetLanguage}.md`;
        await fs.writeFile(outputFile, translatedContent, 'utf8');

        // 출력 설정
        core.setOutput('translated_file', outputFile);
        console.log(`Translation completed: ${outputFile}`);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();