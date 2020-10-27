// array of questions for user
const inquirer = require("inquirer");
const fs = require('fs');
const axios = require("axios");
const generate = require('./utils/generateMarkdown');

const questions = [
    {
        type: "input",
        message: "What your ReadME title?",
        name: "title",
      }, 

      {
          type: "input",
          message: "Give a description of your file",
          name: "Description",
      },

    
    {
        type: "input",
        message: "What do you need to install in order to use it?",
        name: "Installation",
    },

    {
        type: "input",
        message: "What is the licensing?",
        name: "License",
    },

    {
        type: "input",
        message: "Who were the contributors?",
        name: "Contributing",
    },

    {
        type: "input",
        message: "What is your GitHub username",
        name: "GitHub",
    },

];

inquirer
    .prompt(questions)
    .then(function(data){
        const queryUrl = `https://api.github.com/users/${data.username}`;

        axios.get(queryUrl).then(function(res) {
            
            const githubInfo = {
                githubImage: res.data.avatar_url,
                email: res.data.email,
                profile: res.data.html_url,
                name: res.data.name
            };
            
          fs.writeFile("README.md", generate(data, githubInfo), function(err) {
            if (err) {
              throw err;
            };
    
            console.log("New README file created with success!");
          });
        });

});

function init() {

}

init();
