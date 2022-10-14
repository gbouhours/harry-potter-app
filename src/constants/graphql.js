import gql from "graphql-tag";
export const GET_MOVIES = gql`
  query getMovies {
    movies {
      id
      title
      director
      composer
      release_date
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation addMovie(
    $title: String!
    $director: String!
    $composer: String!
    $release_date: date!
  ) {
    insert_movies(
      objects: [
        {
          title: $title
          director: $director
          composer: $composer
          release_date: $release_date
        }
      ]
    ) {
      returning {
        id
      }
    }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation removeMovie($id: uuid!) {
    delete_movies(where: { id: { _eq: $id } }) {
      returning {
        title
        id
      }
    }
  }
`;

export const EDIT_MOVIE = gql`
  mutation editMovie(
    $id: uuid!
    $title: String!
    $director: String!
    $composer: String!
    $release_date: date!
    ) {
    update_movies(where: { id: { _eq: $id } },
      _set:{
        title: $title
        director: $director
        composer: $composer
        release_date: $release_date
      }) {
      returning {
        id
      }
    }
  }
`;
