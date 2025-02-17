import {
  useCheckoutMutation,
  useCreatePaymentMutation,
} from '@/services/payment';
import {useMemo} from 'react';

const useHandleCheckout = ({
  order,
  onOpenChange,
  selectedPaymentMethod,
  router,
}) => {
  const [addPayment, {isLoading: isAddingPayment}] = useCreatePaymentMutation();
  const [checkout, {isLoading: isCheckout}] = useCheckoutMutation();
  const isCredit = useMemo(
    () => selectedPaymentMethod?.name == 'credit',
    [selectedPaymentMethod],
  );

  const isChecking = useMemo(
    () => [isAddingPayment, isCheckout].some(Boolean),
    [isAddingPayment, isCheckout],
  );

  const handlePayment = async (token, cardId) => {
    try {
      await addPayment({
        orderId: order?.id,
        body: {
          payment_method_id: selectedPaymentMethod?.id,
          ...(isCredit && {card_id: cardId}),
          ...(token && {token_id: token}),
        },
      }).unwrap();
      await checkout(order?.id).unwrap();
      router.replace(`/orderDetails/${order?.id}`);
    } catch (error) {
      console.log(error);
    }
    onOpenChange(false);
  };

  return {handlePayment, isChecking};
};
export default useHandleCheckout;
