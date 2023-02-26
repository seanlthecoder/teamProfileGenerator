//This creates an employee summary page by prompting the user for employee details using the inquirer package, creating employee objects using constructor functions based on user input, and generating an HTML file with employee information using the htmlRenderer module. 

//prompts the user for the employee's position, name, ID number, email, and other position-specific details such as office number, GitHub username, or school, and validates the input using several validation functions. The program stores employee objects in an array, and if the user wishes to add another employee, the program continues prompting for details until the user is finished. 

// it generates an HTML file with employee information in the output directory.

const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// creates an HTML file and path

const output_dir = path.resolve(__dirname, "output");
const outputPath = path.join(output_dir, "team.html");

// Import the htmlRenderer.js from the lib directory and assign it to the render constant.
const render = require("./lib/htmlRenderer");

// this empty array will be used to store team members
const employees = [];

// checkDir will check to see if a directory exists. It it doesn't exist, it creates the directory using 'fs.mkdirSync'
const checkDir = () => {
    if (!fs.existsSync(output_dir)) {
        fs.mkdirSync(output_dir);
    };


};

// function to write the team.html file

const createHtml = () => {

    const teamFile = render(employees);
    checkDir();
    fs.writeFileSync(outputPath, teamFile);

};

// this function will allow only number as input for id and office number fields
const confirmNum = async (input) => {
    if (!isNaN(input)) {
        return true;
    } else {
        console.log('Enter a number, press the up key and delete the previous entry');
        return false;

    };

    };

    // The function first checks whether the input is not an empty string using a strict inequality operator. If the input is not an empty string, the function returns true, indicating that the input is valid. Otherwise, the function logs a message to the console stating that the field does not accept blank values and instructs the user to press up and delete the previous entry. 

    // Flase indicates that the input isn't valid.

    // 'async' means that it returns a promise that resolves to either true or false
    const confirmInput = async (input) => {
        if (input !== '') {
            return true;
        } else {
            console.log('This field does not accept blank values, press the up key and delete the previous entry');
            return false;

        };

    };

    // function tha takes an input parameter. It checks whether the input includes the @ symbol using the 'includes' method. If the input includes the @ symbol, the function returns true, indicating that the input is valid. Otherwise, the function logs a message to the console stating that the email address requires the @ symbol
const confirmEmail = async (input) => {
    if (input.includes('@')) {
        return true;
    } else {
        console.log('Email address requires the @ symbol');
        return false;
    };
                                                                   
    };

      const newTeam = () => {
       return inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeName',
                    message: 'Employee name',
                    validate: confirmInput,
                },
                { // array of strings that specifies the available options that the user can select from.

                    type: 'list',
                    name: 'position',
                    message: 'Employee Postion',
                    choices: ['Manager', 'Engineer', 'Intern'],

                },

                {
                    type: 'number',
                    name: 'employeeID',
                    message: 'Employee id number',
                    validate: confirmNum,
                },
                {
                    type: 'input',
                    name: 'employeeEmail',
                    message: 'Employee email',
                    validate: confirmEmail,
                },
                { // object for question prompt. The prompt will only be displayed if the user previous answer to a question with the name 'position' is equal to the string 'manager'
                    type: 'number',
                    name: 'managerOfficeId',
                    message: 'Manager Office Number',
                    when: (answers) => answers.position === 'Manager',
                    validate: confirmNum,
                },
                {
                    type: 'input',
                    name: 'githubUsername',
                    message: 'Github Username',
                    when: (answers) => answers.position ==='Engineer',
                    validate: confirmInput,
                },
                { //
                    type: 'input',
                    name: 'internSchool',
                    message: "Intern's School",
                    when: (answers) => answers.position === 'Intern',
                    validate: confirmInput,
                },
                {
                    type: 'confirm',
                    name: 'additionalEmployee',
                    message: 'add another employee'
                },

            ])

            // conditional statements to determine which constructor to use based on the user's input. If manager is selected,the function will create a new 'manager' object and assign it to 'added employee' passing in the user's input in the employeeName, employeeID, employeeEmail and managerOffice fields.
            .then((answers) => {
                let addedEmployee;
                if (answers.position === 'Manager') {
                    addedEmployee = new Manager(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.managerOfficeId);
                };
                // if the user selects intern, the functiopn creates a new intern object and assigns it to 'added employee' passing in the user's input for employeeName, employeeID, employeeEmail and internSchool.
                if (answers.position === 'Intern') {

                    addedEmployee = new Intern(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.internSchool);
                };
                // if engineer is selected by the user, the function creates a new 'engineer' object and assigns it to the addedEmployee, passing in the user's input for 'employeeName, employeeID, employeeEmail and githubUsername
                if (answers.position === 'Engineer') {
                    addedEmployee = new Engineer(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.githubUsername);
                };

                // add employee object to team array
                // if statement that checks the user's answers. if the user answers true, the function newTeam() will be called to prompt the user to add another employee. If the user answers false, the function makeHtml() will be called to generate an HTML file that contains information about all the employees in the employees array.

                employees.push(addedEmployee);
                
                if (answers.additionalEmployee==true) {
                     newTeam();
                } else {
                     createHtml();
                };
            });
        
            
            }

              // this function starts the prompt

              const init = () => {
                console.log('Please enter the appropriate response for each prompt');
                newTeam();

            };

            // the init function
            init();











                







