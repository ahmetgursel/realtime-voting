import { gql } from '@apollo/client';

export const QUESTION_DETAIL_SUBSCRIPTION = gql`
  subscription questionDetail($questionId: Int!) {
    questions_by_pk(id: $questionId) {
      id
      title
      options {
        id
        title
        votes_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
`;

export const NEW_VOTE_MUTATION = gql`
  mutation newVote($input: votes_insert_input!) {
    insert_votes_one(object: $input) {
      option {
        title
      }
    }
  }
`;
