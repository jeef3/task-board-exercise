import { gql, useQuery } from "@apollo/client";

const GET_ME = gql`
  query me {
    me {
      id
      email
      firstName
      lastName

      createdAt
      updatedAt

      memberships {
        role {
          id
          __typename
          ... on AdminRole {
            admin
          }
          ... on UserRole {
            admin
            write
          }
        }

        organisation {
          id
          name
          timezone
        }
      }
    }
  }
`;

export default function App() {
  const { loading, error, data } = useQuery(GET_ME);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <p className="read-the-docs">
        Hi<pre> {JSON.stringify(data, null, 2)}</pre>
      </p>
    </>
  );
}
