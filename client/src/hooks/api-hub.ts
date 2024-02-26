import { useMutation, useQuery } from '@tanstack/react-query';
import apiHubService from '../services/api-hub-service';

export function useGetApiHub({ endpoint, params }) {
  return useQuery({
    queryKey: [endpoint, JSON.stringify(params)],
    queryFn: () => apiHubService.get(endpoint, params),
  });
}

export function useGetListApiHub({ endpoint, params }) {
  return useQuery({
    queryKey: [endpoint, JSON.stringify(params)],
    queryFn: () => apiHubService.getlist(endpoint, params),
  });
}

export function useGetDetailApiHub({ endpoint, id }) {
  return useQuery({
    queryKey: [endpoint, id],
    queryFn: () => apiHubService.getDetail(endpoint, id),
  });
}

export function useCreateApiHub(endpoint) {
  return useMutation({
    mutationFn: (data: any) => apiHubService.create(endpoint, data),
  });
}

export function useUpdateApiHub(endpoint) {
  return useMutation({
    mutationFn: (data: any) => apiHubService.update(endpoint, data),
  });
}

export function useDeleteApiHub(endpoint) {
  return useMutation({
    mutationFn: (id) => apiHubService.delete(endpoint, id),
  });
}
