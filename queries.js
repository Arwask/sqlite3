'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('company.sqlite', (err) => { //checks if it exists, if not it creates new but if exists it just uses the existing one
    if(err) 
        console.log("Error:",err.toString());
    console.log('Connected');
});

db.run('DROP TABLE IF EXISTS employees', () => {
    createEmployeesTable();
});

const createEmployeesTable = () => {
    db.run('CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT, salary INT, department TEXT)', () => {
        console.log("created");
        populateEmployees();
        getFilteredData();
    });
};


// db.run('INSERT INTO employees VALUES (1, "Fred", "Jones", 45000, "Sales")');
// db.run('INSERT INTO employees VALUES (2, "Fredrica", "Jonathon", 75000, "CEO")');

const populateEmployees = () => {
    const { list } = require('./employees.json');

        list.forEach( (employee) => {
            db.run(`INSERT INTO employees VALUES(
                ${employee.id},
                "${employee.firstName}",
                "${employee.lastName}",
                ${employee.salary},
                "${employee.dept}")`, () => {
                    console.log("Done");
                    getFilteredData();
                })
        });
    console.log("get filtered data");
};


// db.get('SELECT * FROM employees') <---- db.get gets only one data even though you asked for all
// const getFilteredData = () => {

//     db.all('Select * from employees', (err, allRows) => {
//         // console.log("ALL Data", allRows);
    
//         if(err) 
//             return console.log('err', err.toString());
    
//         //sort alphabetically by first name
//         // make array of emps whose salary > 50
//         allRows.sort( (a,b) => a.first.localeCompare(b.first) ) //localeCompare (google it) : sorts string and returns negative, positive or 0
//         .filter( (emp) => emp.salary > 5000)
//         .map( (emp) => {
//             `${emp.first} ${emp.last}'s salary: ${emp.salary}`
//             console.log(emp);
//         })
//     })
// }

const getFilteredData = () => {
    console.log("where???");
    db.each(`select * from employees`, (err, {id, first, last, deaprtment, salary}) => {
        if(err) 
            console.log(err.toString());
        console.log(`${id} ${first} ${last}`)
    })


    db.all(`select * from employees`, (err, data) => {
        console.log("data??", data)
                if(err)
                    console.log("Errrr:", err.toString());
                return data;
            });
}
