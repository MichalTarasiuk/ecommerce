import {useCart} from '@/app/contexts/contexts';

export function ProductsPage() {
  const {addToCart} = useCart();

  return (
    <button
      onClick={() => {
        void addToCart('UHJvZHVjdFZhcmlhbnQ6Mzg0');
      }}
    >
      add to cart
    </button>
  );
}
