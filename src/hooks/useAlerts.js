import {ToastAction} from '@/components/ui/toast';
import {useToast} from './use-toast';
import {useTranslations} from 'next-intl';
const useAlerts = () => {
  const {toast} = useToast();
  const t = useTranslations();

  const errorAlert = (title, description) => {
    toast({
      variant: 'destructive',
      title: title || t('error'),
      description: description,
    });
  };

  return {errorAlert};
};
export default useAlerts;
