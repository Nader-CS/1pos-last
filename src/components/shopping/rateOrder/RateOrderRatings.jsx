'use client';
import {useRateOrderMutation} from '@/services/order';
import Image from 'next/image';
import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {AppButton} from '../../common';
import {redirect} from 'next/navigation';

const ratings = [1, 2, 3, 4, 5];

function RateOrderRatings({orderId}) {
  const t = useTranslations();
  const [selectedOrderRating, setSelectedOrderRating] = useState(null);
  const [orderComment, setOrderComment] = useState('');
  const [rateOrder, {isLoading: isLoadingOrderRate}] = useRateOrderMutation();

  const handlePress = async () => {
    const response = await rateOrder({
      rating: {
        rate: selectedOrderRating,
        ...(orderComment?.length > 0 && {comment: orderComment}),
      },
      rateable_type: 'Order',
      rateable_id: orderId,
    });
    if (response?.error) {
      return;
    }
    redirect('/');
  };
  return (
    <div className="flex w-full flex-col items-center gap-5 px-10">
      <div className="flex w-full items-center justify-between">
        {ratings.map((rating, index) => (
          <Image
            key={index}
            alt={rating}
            src={`/rating${rating}.png`}
            width={45}
            height={45}
            className="h-[45px] w-[45px] cursor-pointer"
            style={{
              filter:
                selectedOrderRating === rating
                  ? 'brightness(0) saturate(100%) invert(87%) sepia(16%) saturate(5776%) hue-rotate(149deg) brightness(85%) contrast(90%)'
                  : 'none',
            }}
            onClick={() => setSelectedOrderRating(rating)}
          />
        ))}
      </div>
      <textarea
        value={orderComment}
        onChange={e => setOrderComment(e.target.value)}
        className="h-36 w-[100%] resize-none rounded-2xl border-[1px] bg-white px-3 pt-3 font-[regular] text-[12px] text-black focus:border-linkHovorColor focus:outline-none focus:ring-0"
        rows={7}
        placeholder={t('tell_us_about_your_experience')}
      />
      <AppButton
        name={t('submit')}
        buttonStyle={`bg-scooter w-[100%] h-12 rounded-3xl uppercase justify-center mt-7`}
        buttonTxtStyle={'font-[medium] text-[13px] text-white'}
        showArrow={false}
        onClick={handlePress}
        disabled={!selectedOrderRating}
        isLoading={isLoadingOrderRate}
      />
    </div>
  );
}

export default RateOrderRatings;
