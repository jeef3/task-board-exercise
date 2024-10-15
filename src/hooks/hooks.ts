import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_TICKET,
  GET_ME,
  GET_ORGANISATION,
  PUT_BOARD,
  PUT_TICKET,
} from "../queries";

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

export function useUpdateBoard() {
  return useMutation(PUT_BOARD);
}

export function useUpdateTicket() {
  return useMutation(PUT_TICKET);
}

export function useDeleteTicket() {
  return useMutation(DELETE_TICKET);
}
