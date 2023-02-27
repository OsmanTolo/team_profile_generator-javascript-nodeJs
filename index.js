const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const render = require("./src/page-template.js");

// Define the default directory path for the geenrated html file
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Initialise the team output array to be used in the render function
let team = [];

// 1) Create the initial prompt to gather manager information
startProgram();
function startProgram() {
  // a. Prompt user information about the manager
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the manager?",
        default: () => {
          return "John Doe";
        },
      },
      {
        type: "input",
        name: "id",
        message: "What is the manager's employee ID?",
        default: () => {
          return 12345;
        },
      },
      {
        type: "input",
        name: "email",
        message: "What is the manager's email address?",
        default: () => {
          return "johndoe@example.com";
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's Office Number?",
        default: () => {
          return 077712345;
        },
      },
    ])
    // b. Create a new instance of the manager class with user information
    .then((answers) => {
      const newManager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      // c. Push the prompt user information to the team array
      team.push(newManager);
      // d. Display the menu options
      menu();
    });
}

// 2) Create menu function
function menu() {
  // a. Provide the menu options to user
  inquirer
    .prompt({
      type: "list",
      name: "options",
      message: "What do you want to do next?",
      choices: ["Add an engineer", "Add an intern", "Finish building the team"],
    })
    // b. Conditional to determine the outcome of each option
    .then((answers) => {
      switch (answers.options) {
        case "Add an engineer":
          addEngineer();
          break;
        case "Add an intern":
          addIntern();
          break;
        default:
          buildTeam();
          break;
      }
    });
}
// 3) Create the engineer function
function addEngineer() {
  // a. Prompt user information about the engineer
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the engineer?",
        default: () => {
          return "John Doe";
        },
      },
      {
        type: "input",
        name: "id",
        message: "What is the engineer's employee ID?",
        default: () => {
          return 12345;
        },
      },
      {
        type: "input",
        name: "email",
        message: "What is the engineer's email address?",
        default: () => {
          return "johndoe@example.com";
        },
      },
      {
        type: "input",
        name: "github",
        message: "What is the engineer's github username?",
      },
    ])
    // b. Create a new instance from the engineer class
    .then((answers) => {
      const newEngineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      // c. Push the prompt information to the team array
      team.push(newEngineer);
      // d. Go back to the menu
      menu();
    });
}

// 4) Create the intern function
function addIntern() {
  // a. Prompt user information about the intern
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the intern?",
        default: () => {
          return "John Doe";
        },
      },
      {
        type: "input",
        name: "id",
        message: "What is the interns's employee ID?",
        default: () => {
          return 12345;
        },
      },
      {
        type: "input",
        name: "email",
        message: "What is the interns's email address?",
        default: () => {
          return "johndoe@example.com";
        },
      },
      {
        type: "input",
        name: "school",
        message: "What is the name of the intern's School?",
      },
    ])
    // b. Create the new instance from the intern class
    .then((answers) => {
      const newIntern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      // c. Push the prompt information to the team array
      team.push(newIntern);
      // d. Go back to the menu
      menu();
    });
}

// 5). Create the build team function
function buildTeam() {
  // a. Check if the directory already exists, if not create it
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  // b. Render the team to the page using the render function
  fs.writeFileSync(outputPath, render(team), "utf8");
}
