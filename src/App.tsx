import { useQuery } from "@apollo/client";
import { GET_ME } from "./queries";

export default function App() {
  const { loading, error, data } = useQuery(GET_ME);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data</p>;

  const { me } = data;

  return (
    <>
      <p className="read-the-docs">Hi, {me.firstName}</p>
      <pre> {JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
