import {useEffect} from 'react';

import {useAddToCart} from './hooks/useAddToCart';

export function ProductsPage() {
  const addToCart = useAddToCart();

  useEffect(() => {
    void addToCart('UHJvZHVjdFZhcmlhbnQ6Mzg0');
  }, [addToCart]);

  return null;
}
