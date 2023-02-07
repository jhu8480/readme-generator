const fs = require('fs');
const fsPro = require('fs').promises;
const inquirer = require('inquirer');


const questions = JSON.parse(fs.readFileSync('./questions.json', 'utf8'));
const prompt = inquirer.createPromptModule();
  prompt(questions).then(
  async (response) => {
    const readmeFile = `./files/readme.md`;
    await fsPro.mkdir('./files');
    await fsPro.writeFile(readmeFile, `# ${response.title}\n`, (err) => {
      if (err) throw err;
    });

    const licenseBadge = `[![License](https://img.shields.io/badge/License-${response.license}-blue.svg)]`;

    await fsPro.appendFile(readmeFile, `\n\n## License \n\t${response.license} \n\t${licenseBadge}`);

    await fsPro.appendFile(readmeFile, `\n\n## Description \n\t${response.description}`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, `\n\n## Installation \n\t${response.installation}`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, `\n\n## Usage \n\t${response.usage}`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, `\n\n## Contributors \n\t${response.contributors}`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, `\n\n## GitHub Username \n\t${response.github}`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, `\n\n## Email \n\t${response.email}`, (err) => {
      if (err) throw err;
    });
  }
);



// Exit on uncaught errors
process.on('uncaughtException', err => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1); // exit the app
});