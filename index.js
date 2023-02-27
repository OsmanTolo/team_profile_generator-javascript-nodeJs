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

// Initialise the team output
let team = [];

// 1. Create the initial prompt - manager information
startProgram();
function startProgram() {
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
    .then((answers) => {
      const newManager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      // Push the prompt information to the team array
      team.push(newManager);
      menu();
    });
}

// 2. Create menu function
function menu() {
  inquirer
    .prompt({
      type: "list",
      name: "options",
      message: "What do you want to do next?",
      choices: ["Add an engineer", "Add an intern", "Finish building the team"],
    })
    // Conditional to determine the outcome of each option
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
// 2. Create the engineer function
function addEngineer() {
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
    .then((answers) => {
      const newEngineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      // Push the prompt information to the team array
      team.push(newEngineer);
      // Go back to the menu
      menu();
    });
}

// 3. Create the intern function
function addIntern() {
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
    .then((answers) => {
      const newIntern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      // Push the prompt information to the team array
      team.push(newIntern);
      // Go back to the menu
      menu();
    });
}

// 4. Create the build team function
function buildTeam() {
  // Check if the directory already exists, if not create it
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  // Render the team to the page
  fs.writeFileSync(outputPath, render(team), "utf8");
}
