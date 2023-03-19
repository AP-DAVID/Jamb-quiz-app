import { gql } from "@apollo/client";

const GET_SUBJECTS = gql`
  query getSubjects {
    subjects {
      id
      name
    }
  }
`;

const GET_SUBJECT_BY_ID = gql`
  query getSubjectById($id: ID!) {
    subject(id: $id) {
      id
      name
      questions {
        id
        question
        options
        answer
      }
    }
  }
`;

export { GET_SUBJECTS, GET_SUBJECT_BY_ID };
