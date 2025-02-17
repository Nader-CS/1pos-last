import {toast} from 'react-toastify';

const useHandleToasts = () => {
  const errorToast = error => {
    return toast.error(error);
  };
  const successToast = success => {
    return toast.success(success);
  };
  const infoToast = info => {
    return toast.success(info);
  };
  return {errorToast, successToast, infoToast};
};
export default useHandleToasts;
