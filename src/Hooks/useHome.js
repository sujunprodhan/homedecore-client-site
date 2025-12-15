import axios from 'axios';
import { useEffect, useState } from 'react';

const useHome = () => {
  const [homeData, setHomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/home.json')
      .then((res) => {
        setHomeData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { homeData, loading, error };
};

export default useHome;
