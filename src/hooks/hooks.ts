import { useQuery } from "@apollo/client";
import { GET_ME, GET_ORGANISATION } from "../queries";

export function useCurrentUser() {
  return useQuery(GET_ME);
}

export function useCurrentOrg() {
  const { data } = useCurrentUser();

  const { me } = data ?? {};
  const organisationId = me?.memberships[0]?.organisation.id;

  const userLoaded = !!organisationId;

  return useQuery(GET_ORGANISATION, {
    skip: !userLoaded,
    variables: { organisationId: organisationId ?? "" },
  });
}
