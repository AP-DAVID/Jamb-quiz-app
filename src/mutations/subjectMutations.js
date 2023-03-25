import { gql } from "@apollo/client";

const ADD_SUBJECT = gql`
  mutation addSubject($name: String!) {
    addSubject(name: $name) {
      id
      name
    }
  }
`;

const ADD_QUESTION = gql`
  mutation addQuestion(
    $subjectId: ID!
    $question: String!
    $options: [String!]
    $answer: String!
  ) {
    addQuestion(
      subjectId: $subjectId
      question: $question
      options: $options
      answer: $answer
    ) {
      id
      question
      options
      answer
    }
  }
`;

const DELETE_SUBJECT = gql`
  mutation deleteSubject($id: ID!) {
    deleteSubject(id: $id) {
      name
      id
    }
  }
`;

const DELETE_QUESTION = gql`
  mutation deleteQuestion($id: ID!) {
    deleteQuestion(id: $id) {
      id
      question
      options
      answer
    }
  }
`;

const UPDATE_QUESTION = gql`
  mutation updateQuestion(
    $id: ID!
    $question: String!
    $options: [String!]
    $answer: String!
  ) {
    updateQuestion(
      id: $id
      question: $question
      options: $options
      answer: $answer
    ) {
      id
      question
      options
      answer
    }
  }
`;

const UPDATE_SUBJECT = gql`
  mutation updateSubject($id: ID!, $name: String!) {
    updateSubject(id: $id, name: $name) {
      id
      name
    }
  }
`;

export {
  ADD_QUESTION,
  ADD_SUBJECT,
  DELETE_QUESTION,
  DELETE_SUBJECT,
  UPDATE_QUESTION,
  UPDATE_SUBJECT,
};
