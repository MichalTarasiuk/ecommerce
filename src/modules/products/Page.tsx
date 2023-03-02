import {useEffect} from 'react';

import {useCart} from '@/app/contexts/contexts';

export function ProductsPage() {
  const {addToCart} = useCart();

  useEffect(() => {
    void addToCart('UHJvZHVjdFZhcmlhbnQ6Mzg0');
  }, [addToCart]);

  return null;
}
