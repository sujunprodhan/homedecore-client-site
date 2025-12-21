import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import axios from 'axios';

const useRole = () => {
  const { user } = useAuth();

  const { data: role = 'user', isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `https://homedecore-server-site.vercel.app/users/${user.email}/role`
      );
      return res.data.role;
    },
  });

  return [role, isLoading];
};

export default useRole;
