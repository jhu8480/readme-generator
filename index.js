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
    type: 'input',
    message: 'Please input the description of the project',
    name: 'description'
  },
  {
    type: 'input',
    message: 'Please type in the installation instructions',
    name: 'installation'
  },
  {
    type: 'list',
    message: 'Please choose liscence type',
    name: 'liscence',
    choices: ['MIT License', 'Apache License 2.0', 'Mozilla Public License 2.0', 'Boost Software License 1.0', 'Eclipse Public License 2.0']
  }
];


prompt(questions).then(
  async (response) => {
    const readmeFile = `./files/readme.md`;
    await fsPro.mkdir('./files');
    
    await fsPro.writeFile(readmeFile, `# ${response.title}\n`, (err) => {
      if (err) throw err;
      else console.log('title added to readme.md');
    });

    await fsPro.appendFile(readmeFile, `\n\n## Description \n${response.description}`, (err) => {
      if (err) throw err;
      else console.log('Description added to readme.md');
    });

    await fsPro.appendFile(readmeFile, `\n\n## Installation \n${response.installation}`, (err) => {
      if (err) throw err;
      else console.log('Installation instructions added to readme.md');
    });

    
  }
);




// Exit on uncaught errors
process.on('uncaughtException', err => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1); // exit the app
})