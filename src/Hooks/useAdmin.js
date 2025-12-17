import { useEffect, useState } from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    if (!loading && user?.email) {
      axiosSecure.get(`/users/admin/${user.email}`).then((res) => {
        setIsAdmin(res.data.admin);
        setAdminLoading(false);
      });
    }
  }, [user, loading, axiosSecure]);

  return [isAdmin, adminLoading];
};

export default useAdmin;
