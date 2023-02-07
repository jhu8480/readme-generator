const fsPro = require('fs').promises;
const inquirer = require('inquirer');

const prompt = inquirer.createPromptModule();

const questions = [
  {
    type: 'input',
    message: 'What is the name of your project?',
    name: 'title'
  }
];


prompt(questions).then(
  async (response) => {
    await fsPro.mkdir('./files')
    await fsPro.writeFile(`./files/readme.md`, `# ${response.title}\n`, (err) => {
      if (err) throw err;
      else console.log('title added to readme');
    })
  }
);




// Exit on uncaught errors
process.on('uncaughtException', err => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1); // exit the app
})