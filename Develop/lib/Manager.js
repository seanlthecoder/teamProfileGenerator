// class employee with a constructor function that pulls in parameters; name, id, email and office number.

// constructor function holds the values of name, id, email and officeNumber are assign to the properties of the object by using 'this'

const Employee = require("./Employee")

class Manager extends Employee {
    constructor(name,id,email,officeNumber){
        super(name,id,email) // calls parent class constructor, Employee is the parent
        this.officeNumber = officeNumber 
    }

    // gets office number of manager
    getOfficeNumber(){
        return this.officeNumber
    }

    // returns the role of manager
    getRole(){
        return "Manager"
    }
};

//exports the class Manager
module.exports = Manager