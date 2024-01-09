import { useContext } from 'react';

import { UserContext } from '@context/UserContext';

const OrderConfirmation = (): JSX.Element => {
  const { shoppingCart, setShoppingCart } = useContext(UserContext);
  return (
    <div>
      <div>Hej</div>
    </div>
  );
};

export default OrderConfirmation;
