import revalidateServerComponents from '@/actions';
import {usePublicTokenMutation} from '@/services/user';
import {getCookie, setCookie} from 'cookies-next';
import {useEffect} from 'react';

const useHandlePublicToken = () => {
  const token = getCookie('token');
  const [
    getPublicToken,
    {
      isError: isGettingPublicTokenError,
      isLoading: isGettingPublicToken,
      error: publicTokenError,
      isUninitialized: isGettingPublicTokenUninitialized,
    },
  ] = usePublicTokenMutation();

  const generatePublicToken = async () => {
    const response = await getPublicToken();

    if (!response?.error) {
      setCookie('token', response?.data?.access_token);
      revalidateServerComponents();
    }
  };

  useEffect(() => {
    if (!token) {
      generatePublicToken();
    }
  }, []);

  return {
    isError: isGettingPublicTokenError,
    isLoading:
      isGettingPublicToken || (!token && isGettingPublicTokenUninitialized),
    onRetry: generatePublicToken,
    error: publicTokenError,
  };
};

export default useHandlePublicToken;
