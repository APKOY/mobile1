import { useEffect, useState } from 'react';

export default function useApi(apiFunction, params = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadData() {
    try {
      setLoading(true);
      setError('');

      const result = await apiFunction(...params);
      setData(result);
    } catch (err) {
      setError(err.message || 'Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return {
    data,
    loading,
    error,
    reload: loadData,
  };
}