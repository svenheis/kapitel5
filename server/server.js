const fs = require('fs')
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express')
const { GraphQLScalarType, valueFromASTUntyped } = require('graphql');
const { Kind } = require('graphql/language');
const { serialize } = require('v8');
const { error } = require('console');

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  descripion: 'A Date() type in GraphQL as a scalar',
  serialize (value) {
    console.log('correct')
    return value.toISOString();    
  },
  parseValue (value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;

  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING){
    const value = new Date(ast.value);
    return isNaN(value) ? undefinded : value;
    }
  },
})


let aboutMessage =  'Issue Tracker API v1.0'


  const issueDB = [
    {
    id: 1, status: 'New', owner: 'Ravan', effort: 5, created: new Date('2023-12-04'), due: undefined, titel: 'Error in Console when clicking Add'
    },
    {
      id: 2, status: 'Assigned', owner: 'Eddie', effort: 14, created: new Date('2023-12-02'), due: new Date ('2023-12-03'), titel: 'Missing bottom border on panel'
    }
  ];

  const resolvers = {
    Query: {
    about: () => aboutMessage,
    issueList,
    },
    Mutation: {
    setAboutMessage,
    issueAdd,
    },
    GraphQLDate,
  };
  function validateIssue(_, {issue}){
    const errors = [];
      if (issue.titel.length < 3){
      errors.push('Feld "Titel" muss mindestens 3 Zeichen haben')
      }
      if (issue.status == 'Assigned' && !issue.owner) {
      errors.push('Feld "owner" is required when status is "Assigned"')
      }
      if (errors.length > 0){
      throw new UserInputError('Invalid input(s)', {errors});
      }
    
  }
  function issueAdd(_, {issue}){
    issueValidate(issue);
    issue.created = new Date();
    issue.id = issueDB.length + 1;
    if (issue.status == undefined) issue.status = 'New';
    issueDB.push(issue);
    return issue;
  }

  function setAboutMessage(_, { message }) {
    return aboutMessage = message;
  }
  function issueList(){
    return issueDB;
  }
  const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
    formatError: error => {
    console.log(error);
    return error;
    }
  });
const app = express();
app.use(express.static('public'))
server.applyMiddleware({app, path: '/graphql'})
app.listen(3000, function(){
  console.log('server start on port 3000')
})
