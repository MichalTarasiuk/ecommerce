import {useAddToCart} from './hooks/hooks';

export const ProductsPage = () => {
  const addToCart = useAddToCart();

  return (
    <button
      onClick={() => {
        void addToCart('UHJvZHVjdFZhcmlhbnQ6Mzg0');
      }}
    >
      add to cart
    </button>
  );
};
