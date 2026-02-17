import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "../services/api";
import type { Person } from "../models/types";

export const usePeople = () => {
  return useQuery({
    queryKey: ["people"],
    queryFn: ApiService.fetchPeople,
    staleTime: 0, // No caching for testing purposes
    retry: false, // Disable retries for better error testing
    refetchOnWindowFocus: false, // Disable automatic refetch on focus
  });
};

export const useUpdatePerson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ personId, updates }: { personId: string; updates: Partial<Person> }) =>
      ApiService.updatePerson(personId, updates),
    onSuccess: () => {
      // Invalidate and refetch people data
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
  });
};
