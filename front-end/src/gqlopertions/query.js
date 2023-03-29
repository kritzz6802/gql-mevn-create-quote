import {gql} from '@apollo/client';
export const CHARACTERS_QUERY = gql `
  query
            {
               quotes{
                  name
                  by{
                     fname
                  }
               }
            }
`;