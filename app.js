const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const manangerQuestions = [{
        type: 'input',
        message: 'Enter manager name',
        name: 'managerName',
        category: 'Manager',
    },
    {
        type: 'input',
        message: 'Enter your office number',
        name: 'officeNumber',
        category: 'Manager',
    },
    {
        type: 'input',
        message: 'Enter your manager id',
        name: 'managerId',
        category: 'Manager',
    },
    {
        type: 'input',
        message: 'Enter your manager email',
        name: 'managerEmail',
        category: 'Manager'
    },
    {
        type: 'input',
        message: 'Enter number of Engineers in the team',
        name: 'numberOfEngineers',
        category: 'Manager',
    }, {
        type: 'input',
        message: 'Enter number of Interns in the team',
        name: 'numberOfInterns',
        category: 'Manager',
    },
];

const engineerQuestions = [{
        type: 'input',
        message: 'Enter engineer name',
        name: 'name',
        category: 'engineer',
    },
    {
        type: 'input',
        message: 'Enter engineer id',
        name: 'id',
        category: 'engineer',
    },
    {
        type: 'input',
        message: 'Enter engineer email address',
        name: 'email',
        category: 'engineer',
    }, {
        type: 'input',
        message: 'Enter your github user name',
        name: 'github',
        category: 'engineer',
    }
];
const internQuestions = [{
        type: 'input',
        message: 'Enter intern name',
        name: 'name',
        category: 'intern',
    },
    {
        type: 'input',
        message: 'Enter intern id',
        name: 'id',
        category: 'intern',
    },
    {
        type: 'input',
        message: 'Enter intern email address',
        name: 'email',
        category: 'intern',
    }, {
        type: 'input',
        message: 'Enter your shool',
        name: 'school',
        category: 'intern',
    },
];


const teamMembers = [];

function init() {
    managerPrompt();


    async function managerPrompt() {
        try {


            const answers = await inquirer.prompt(manangerQuestions);

            if (
                answers.managerName === '' ||
                answers.managerEmail === '' ||
                answers.officeNumber === '' ||
                answers.managerId === ''
            ) {
                throw new Error('enter valid information')
            }

            const manager = new Manager(
                answers.managerName,
                answers.managerEmail,
                answers.officeNumber,
                answers.managerId
            );

            teamMembers.push(manager)

            while (answers.numberOfInterns > 0) {
                await internPrompt(answers.numberOfInterns);
                answers.numberOfInterns--
            }

            while (answers.numberOfEngineers > 0) {
                await engineerPrompt(answers.numberOfEngineers);
                answers.numberOfEngineers--
            }
            console.log(teamMembers);
            const html = render(teamMembers);
            fs.writeFile(outputPath, html, function (err) {
                if (err) throw err;
            });
        } catch (err) {
            throw err;
        }
    }

    async function internPrompt(numberOfInterns) {
        try {


            const answers = await inquirer.prompt(internQuestions);
            if (
                answers.name === "" ||
                answers.id === "" ||
                answers.email === "" ||
                answers.school === ""
            ) {
                throw new Error("Please enter valid information");
            }
            const intern = new Intern(
                answers.name,
                answers.id,
                answers.email,
                answers.school
            );
            teamMembers.push(intern);

        } catch (err) {
            throw err;
        }
    }

    async function engineerPrompt(numberOfEngineers) {
        try {


            const answers = await inquirer.prompt(engineerQuestions);
            if (
                answers.name === "" ||
                answers.id === "" ||
                answers.email === "" ||
                answers.github === ""
            ) {
                throw new Error("Please enter valid information");
            }
            const engineer = new Engineer(
                answers.name,
                answers.id,
                answers.email,
                answers.github
            );
            teamMembers.push(engineer);


        } catch (err) {
            throw err;
        }
    }
}


init();