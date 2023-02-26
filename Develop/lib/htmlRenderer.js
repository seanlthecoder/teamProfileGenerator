// importing 'path' module to provide to work with file system.

const path = require('path');

// importing the 'fs' module to work with file system
const fs = require('fs');

// creating a constant variable 'templatesDir'
// '_dirname' is the directory of the module and will construct the path to the template directory
const templatesDir = path.resolve(__dirname, '..', 'templates');

// the function render takes the employees argument which is an array of employee objects.
// it uses the empty html array. It will store strings of html code that represent the employees within the array.
const render = employees => {
    const html = [];
    html.push(employees
        .filter(employee => employee.getRole() === "Engineer")
        .map(engineer => renderEngineer(engineer))
      );
    html.push(employees
        .filter(employee => employee.getRole() === "Manager")
        .map(manager => renderManager(manager))

    );
    html.push(employees
        .filter(employee => employee.getRole() === "Intern")
        .map(intern => renderIntern(intern))
    );
    // html variable is an array of strings that represents html elements. 'join' will concatenate the strings into a single string. This string is then passed as an argument to the render function.

    // this code will  render the HTML elements as a single string, which will  display the elements on a webpage or in another context where HTML is supported.
    return renderHTML_1(html.join(""));

    };

        // the function renderEngineer takes 'engineer' object as an argument. This function takes 'fs' File System, to read the file named "engineer" from the 'templatesDir' directory.  the file is an HTML template to render details about an engineer.

        const renderEngineer = engineer => {
            let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
            template = replacePlaceholders(template, "role", engineer.getRole());
            template = replacePlaceholders(template, "name", engineer.getName());
            template = replacePlaceholders(template, "email", engineer.getEmail());
            template = replacePlaceholders(template, "id", engineer.getId());
            template = replacePlaceholders(template, "github", engineer.getGithub());

            return template;

        };
    
        const renderIntern = intern => {
            let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
            template = replacePlaceholders(template, "name", intern.getName());
            template = replacePlaceholders(template, "email", intern.getEmail());
            template = replacePlaceholders(template, "role", intern.getRole());
            template = replacePlaceholders(template, "id", intern.getId());
            template = replacePlaceholders(template, "school", intern.getschoolName());
            return template;


        };


        // function reading the 'manager.html' file located in the 'templatesDir' directory
        // path.resolve is used to create an absolute path to the 'manager.html' file
        const renderManager = manager => {
            let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
            template = replacePlaceholders(template, "name", manager.getName());
            template = replacePlaceholders(template, "role", manager.getRole());
            template = replacePlaceholders(template, "email", manager.getEmail());
            template = replacePlaceholders(template, "id", manager.getId());
            template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());

            return template;
        };

        const renderHTML_1 = html => {
            const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
            return replacePlaceholders(template, "team", html);
        };

        const replacePlaceholders = (template, placeholder, value) => {
            const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
            return template.replace(pattern, value);
        };


        module.exports = render;