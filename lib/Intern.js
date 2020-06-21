// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
class Intern {
    constructor(name, id, emailAdress, school) {
        this.name = name;
        this.id = id;
        this.emailAddress = emailAdress;
        this.school = school;
        this.role = 'Intern';
    }

    getRole() {
        return this.role;
    }
}

module.exports = Intern;