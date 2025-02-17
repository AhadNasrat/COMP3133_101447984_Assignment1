const { gql } = require('apollo-server-express');
module.exports = gql`
    type User {
        username: String!
        email: String!
        token: String
    }
    type Employee {
        _id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        designation: String!
        salary: Float!
        date_of_joining: String!
        department: String!
        employee_photo: String
    }
    type Query {
        login(username: String, email: String, password: String!): User
        getAllEmployees: [Employee]
        getEmployeeById(eid: ID!): Employee
        searchEmployees(designation: String, department: String): [Employee]
    }
    type Mutation {
        signup(username: String!, email: String!, password: String!): User
        addEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, designation: String!, salary: Float!, date_of_joining: String!, department: String!, employee_photo: String): Employee
        updateEmployee(eid: ID!, first_name: String, last_name: String, email: String, gender: String, designation: String, salary: Float, date_of_joining: String, department: String, employee_photo: String): Employee
        deleteEmployee(eid: ID!): String
    }
`;
