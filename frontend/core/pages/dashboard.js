import { useQuery } from "@apollo/client";
import { userDetails } from "../app/api/graphql";
import { useAuthentication } from "../app/api/authorization";

function Dashboard() {
  const { isSignedIn } = useAuthentication();

  function Check() {
    if (isSignedIn) return <>YOU ARE SIGNED IN!</>;
  }
  const { data, loading } = useQuery(userDetails);
  if (loading) {
    return <> Page Loading... </>;
  }
  return (
    <>
      <Check />
      Logged in as {data.userDetails[0].username.toTitle()}.
    </>
  );
}

export default Dashboard;
