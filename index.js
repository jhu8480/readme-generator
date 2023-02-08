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

    await fsPro.appendFile(readmeFile, `\n\n## Table of Contents\n\t - [License - Link](#license)\n\t - [Description - Link](#description)\n\t - [Installation - Link](#installation)\n\t - [Usage - Link](#usage)\n\t - [Contributing - Link](#contributing)\n\t - [Questions - Link](#questions)`)

    const licenseBadge = `![License](https://img.shields.io/badge/License-MIT-blue.svg)`;

    await fsPro.appendFile(readmeFile, `\n\n## License \n\t${response.license} \n\t${licenseBadge}`);

    await fsPro.appendFile(readmeFile, `\n\n## Description\n\t${response.description}`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, `\n\n## Installation\n\t${response.installation}`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, `\n\n## Usage\n\t${response.usage}`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, `\n\n## Contributing\n\t${response.contributing}`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, '\n\n## Questions \n\t Where are my projects stored?')

    await fsPro.appendFile(readmeFile, `\n\t - link to github profile: https://github.com/${response.github}/`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, '\n\t How do I contact the author?')

    await fsPro.appendFile(readmeFile, `\n\t - Email: ${response.email}`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, `\n\n## Keywords\n\t${response.keywords.join(' ')}`);
  }
);



// Exit on uncaught errors
process.on('uncaughtException', err => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1); // exit the app
});