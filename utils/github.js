const exec = require("@actions/exec");

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

const isGitHubAction = process.env.GITHUB_ACTIONS === 'true';

module.exports = {
    configureGit,
    commitAndPush,
    isGitHubAction
};