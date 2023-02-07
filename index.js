const fsPro = require('fs').promises;
const inquirer = require('inquirer');

const prompt = inquirer.createPromptModule();

const questions = [
  {
    type: 'input',
    message: 'What is the name of your project?',
    name: 'title'
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license for your project:',
    choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3']
  },
  {
    type: 'input',
    message: 'Please input the description of the project',
    name: 'description'
  },
  {
    type: 'input',
    message: 'Please type in the installation instructions',
    name: 'installation'
  }
];


prompt(questions).then(
  async (response) => {
    const readmeFile = `./files/readme.md`;
    await fsPro.mkdir('./files');
    await fsPro.writeFile(readmeFile, `# ${response.title}\n`, (err) => {
      if (err) throw err;
    });

    const licenseBadge = `[![License](https://img.shields.io/badge/License-${response.license}-blue.svg)]`;

    await fsPro.appendFile(readmeFile, `\n\n## License \n${response.license} \n${licenseBadge}`);

    await fsPro.appendFile(readmeFile, `\n\n## Description \n${response.description}`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, `\n\n## Installation \n${response.installation}`, (err) => {
      if (err) throw err;
    });

  }
);




// Exit on uncaught errors
process.on('uncaughtException', err => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1); // exit the app
})