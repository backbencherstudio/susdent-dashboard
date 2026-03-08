'use client';

import React, { useState } from 'react'
import CreatorTable from './CreatorTable'
import CreatorFilters from './CreatorFilters'
import { useQuery } from '@tanstack/react-query'
import { privateAxios } from '@/components/axiosInstance/axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

const fetchCreators = async (filters: { status: string; plan: string }) => {
  const params = new URLSearchParams();
  params.set("role", "creator");
  if (filters.status && filters.status !== "all") params.set("status", filters.status);
  if (filters.plan && filters.plan !== "all") params.set("plan", filters.plan);

  const response = await privateAxios.get(`/admin/user/allusers?${params.toString()}`);
  return response.data;
};

export default function CreatorManagementTable() {
  const [filters, setFilters] = useState({ status: "", plan: "" });

  // Query Client
  const queryClient = useQueryClient();

  // Fetch Creators Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["creators", filters],
    queryFn: () => fetchCreators(filters),
  });

  // Single handler — merges key/value, resets "all" to empty
  const handleFilterChange = (key: "status" | "plan") => (value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };


  // Suspend Creator Mutation
  const suspendMutation = useMutation({
    mutationFn: (userId: string) =>
      privateAxios.patch(`/admin/user/${userId}/suspend`),
    onSuccess: () => {
      toast.success("Creator suspended");
      queryClient.invalidateQueries({ queryKey: ["creators", filters] });
    },
    onError: () => toast.error("Failed to suspend creator"),
  });
  console.log(data?.users);


  return (
    <div>
      <CreatorFilters filters={filters} handleFilterChange={handleFilterChange} />

      <CreatorTable
        data={data?.users}
        isLoading={isLoading}
        error={error}
        onSuspend={(id) => suspendMutation.mutate(id)}
        isSuspending={suspendMutation.isPending}
      />
    </div>
  );
}