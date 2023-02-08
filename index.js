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

    await fsPro.appendFile(readmeFile, `\n\n## Table of Contents\n\t 1. [license](#license)\n\t 2. [Description](#description)\n\t 3. [Installation](#installation)\n\t 4. [Usage](#usage)\n\t 5. [Contributing](#contributing)\n\t 6. [Questions](#questions)`)

    const licenseBadge = `[![License](https://img.shields.io/badge/License-${response.license}-blue.svg)]`;

    await fsPro.appendFile(readmeFile, `\n\n## License <a name="license"></a> \n\t${response.license} \n\t${licenseBadge}`);

    await fsPro.appendFile(readmeFile, `\n\n## Description <a name="description"></a>\n\t${response.description}`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, `\n\n## Installation <a name="installation"></a>\n\t${response.installation}`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, `\n\n## Usage <a name="usage"></a>\n\t${response.usage}`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, `\n\n## Contributing <a name="contributing"></a>\n\t${response.contributing}`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, '\n\n## Questions <a name="questions"></a>\n\t Where are my projects stored?')

    await fsPro.appendFile(readmeFile, `\n\t - link to github profile: https://github.com/${response.github}/`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, '\n\t How do I contact the author?')

    await fsPro.appendFile(readmeFile, `\n\t - Email: ${response.email}`, (err) => {
      if (err) throw err;
    });

    await fsPro.appendFile(readmeFile, `\n\n## Keywords \n\t${response.keywords.join(' ')}`);
  }
);



// Exit on uncaught errors
process.on('uncaughtException', err => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1); // exit the app
});