import { useQuery } from "@apollo/client";
import { GET_ME, GET_ORGANISATION } from "../queries";

export function useCurrentUser() {
  return useQuery(GET_ME);
}

export function useCurrentOrg() {
  const { data: { me } = {} } = useCurrentUser();

  const organisationId = me?.memberships[0]?.organisation.id;

  return useQuery(GET_ORGANISATION, {
    skip: !organisationId,
    variables: { organisationId: organisationId ?? "" },
  });
}
