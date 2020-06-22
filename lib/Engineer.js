// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee')
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
        // this.school = school;
        this.role = 'Engineer';
    }
    getRole() {
        return this.role;
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Engineer;