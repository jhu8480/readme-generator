//Import modules
const fs = require('fs');
const fsPro = require('fs').promises;
const inquirer = require('inquirer');

// get the questions object from questions.json
const questions = JSON.parse(fs.readFileSync('./questions.json', 'utf8'));

// start the prompts
const prompt = inquirer.createPromptModule();
prompt(questions).then(
  async (response) => {
    const readmeFile = `./files/readme.md`;
    await fsPro.mkdir('./files');
    await fsPro.writeFile(readmeFile, `# ${response.title}\n`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, `\n\n## Table of Contents\n[License](#license)\n[Description](#description)\n[Installation](#installation)\n[Usage](#usage)\n[Contributing](#contributing)\n[Questions](#questions)`)

    const licenseBadge = `![License](https://img.shields.io/badge/License-MIT-blue.svg)`;

    await fsPro.appendFile(readmeFile, `\n\n## License \n${response.license} \n${licenseBadge}`);

    await fsPro.appendFile(readmeFile, `\n\n## Description\n${response.description}`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, `\n\n## Installation\n${response.installation}`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, `\n\n## Usage\n${response.usage}`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, `\n\n## Contributing\n${response.contributing}`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, '\n\n## Questions \nWhere are my projects stored?')

    await fsPro.appendFile(readmeFile, `\n- link to github profile: https://github.com/${response.github}/`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, '\nHow do I contact the author?', (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, `\n- Email: ${response.email}`, (err) => {  if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, `\n\n## Keywords\n${response.keywords.join(' ')}`, (err) => {
      if (err) throw err;
    });
  }
);



// Exit on uncaught errors
process.on('uncaughtException', err => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1); // exit the app
});