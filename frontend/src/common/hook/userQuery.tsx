import instance from "@/configs/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useUserQuery = ({ action, id }: { action?: string; id?: string }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [action == action ? `${action}` : "", id ? id : ""],
    queryFn: async () => {
      const res = await instance.get(`/v1/${action}`);

      return res.data;
    },
  });

  return { data, isLoading, isError, error };
};
export default useUserQuery;
