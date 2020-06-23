const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```




const collectEmployeeInfo = [{
        type: 'input',
        message: 'Enter Employee name',
        name: 'name',
        category: 'employee',
    },
    {
        type: 'input',
        message: 'Enter your id',
        name: 'id',
        category: 'employee',
    },
    {
        type: 'input',
        message: 'Enter your email address',
        name: 'email',
        category: 'employee',
    },
    {
        type: 'input',
        message: 'Enter you manager name',
        name: 'mangerName',
        category: 'manger',
    },
    {
        type: 'input',
        message: 'Enter your office number',
        name: 'officeNumber',
        category: 'manger',
    },
    {
        type: 'input',
        message: 'Enter your manager id',
        name: 'managerId',
        category: 'manager',
    },
    {
        type: 'input',
        message: 'Enter your manager email',
        name: 'managerEmail',
        category: 'manager',
    },
    {
        type: 'input',
        message: 'Enter number of Engineers in the team',
        name: 'numberOfEngineers',
        category: 'manager',
    },
    {
        type: 'input',
        message: 'Enter number of Interns in the team',
        name: 'numberOfInterns',
        category: 'manager',
    },
    {
        type: 'input',
        message: 'Enter your github user name',
        name: 'github',
        category: 'engineer',
    },
    {
        type: 'input',
        message: 'Enter your shool',
        name: 'github',
        category: 'intern',
    },
];

const teamMembers = [];

function init() {
    managerPrompt();

    async function managerPrompt() {
        try {
            const questionsManager = collectEmployeeInfo.filter(function (question) {
                return question.category === 'manager';
            });

            const answers = await inquirer.prompt(questionsManager);

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

            if (answers.numberOfInterns > 0) {
                await internPrompt(answers.numberOfInterns);
            }

            if (answers.numberOfEngineers > 0) {
                await engineerPrompt(answers.numberOfEngineers);
            }

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

            const internQuestions = collectEmployeeInfo.filter(function (question) {
                return question.category === "employee" || collectEmployeeInfo.category === "intern";
            });
            for (let i = 0; i < numberOfInterns; i++) {
                const answers = await inquirer.prompt(internQuestions);
                if (
                    answers.name === "" ||
                    answers.id === "" ||
                    answers.email === "" ||
                    answers.school === ""
                ) {
                    throw new Error("Please enter a valid input");
                }
                const intern = new Intern(
                    answers.name,
                    answers.id,
                    answers.email,
                    answers.school
                );
                teamMembers.push(Intern);
            }
        } catch (err) {
            throw err;
        }
    }

    async function engineerPrompt(numberOfEngineers) {
        try {

            const engineerQuestions = collectEmployeeInfo.filter(function (question) {
                return question.category === "employee" || question.category === "engineer";
            });
            for (let i = 0; i < numberOfEngineers; i++) {
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
                employees.push(Engineer);
            }
            console.log(teamMembers);
        } catch (err) {
            throw err;
        }
    }
}


init();