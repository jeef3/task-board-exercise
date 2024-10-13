import { useCurrentOrg, useCurrentUser } from "../hooks/hooks";
import { AppHeaderContainer } from "./atoms/AppAtoms";
import { TextLoader } from "./ContentLoader";

export default function AppHeader() {
  const { data: { me } = {} } = useCurrentUser();
  const { loading, data: { organisation } = {} } = useCurrentOrg();

  return (
    <AppHeaderContainer>
      {loading || !me || !organisation ? (
        <>
          <h3>
            <TextLoader width={160} />
          </h3>
          <span>
            <TextLoader width={120} />
          </span>
        </>
      ) : (
        <>
          <h3>{organisation.name}</h3>
          <span>
            {me.firstName} {me.lastName}
          </span>
        </>
      )}
    </AppHeaderContainer>
  );
}
