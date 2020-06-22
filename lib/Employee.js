// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email, officeNumber, github) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.number = officeNumber;
        this.github = github;
        this.role = "Employee"
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return this.role;
    }

}

module.exports = Employee;