import {
  type FormEvent,
  useContext,
  type SetStateAction,
  type Dispatch,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '@context/UserContext';
import { type FormState, type ShoppingCartItem } from '@interfaces/interfaces';
import { postData, updateObjectAmount } from '@utils/api';
import { generateUUID } from '@utils/uuid';
import formatPrice from '@utils/format-price';
import { sendConfirmationData } from '@pages/Checkout/SendConfirmationForm';

interface UseHandleSubmitProps {
  formState: FormState;
  shoppingCart: ShoppingCartItem[] | null;
  setShoppingCart: Dispatch<SetStateAction<ShoppingCartItem[] | null>>;
  shippingCost: number;
  cartTotal: number;
  setApiError: (data: string) => void;
  setIsLoading: (data: boolean) => void;
  setApiSuccess: (data: string) => void;
  validate: () => boolean;
}

const useHandleSubmit = ({
  formState,
  shoppingCart,
  setShoppingCart,
  shippingCost,
  cartTotal,
  setApiError,
  setIsLoading,
  setApiSuccess,
  validate,
}: UseHandleSubmitProps): ((
  e: FormEvent<HTMLFormElement>,
) => Promise<void>) => {
  const { locale } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (validate()) {
      const data = {
        totalSum: cartTotal,
        shipping: shippingCost,
        userData: {
          name: `${formState.surname} ${formState.lastName}`,
          company: formState.companyName,
          address: `${formState.streetName}, ${formState.areaCode}, ${formState.cityName} ${formState.country}`,
          phoneNumber: formState.phoneNumber,
          email: formState.email,
          message: formState.message,
        },
        orderDetails: shoppingCart,
        shippingInfo: formState.pickup,
        paymentMethod: formState.payment,
        orderId: generateUUID(),
      };

      await sendConfirmationData(
        formState,
        shoppingCart,
        data.orderId,
        formatPrice(shippingCost),
        formatPrice(cartTotal),
        '/api/orders/send',
        setApiError,
        locale,
      );

      await postData(
        '/api/orders',
        data,
        setIsLoading,
        setApiSuccess,
        setApiError,
      );

      if (shoppingCart !== null) {
        shoppingCart.map(async (product: ShoppingCartItem) => {
          const newAmount =
            product.amountAvailable - product.amount >= 0
              ? product.amountAvailable - product.amount
              : 0;
          await updateObjectAmount(
            `/api/items/${product.strapiId}`,
            newAmount,
            setIsLoading,
            setApiSuccess,
            setApiError,
          );
        });
      }

      setShoppingCart(null);

      navigate(`/orderconfirmation/${data.orderId}`);
    }
  };

  return handleSubmit;
};

export default useHandleSubmit;
