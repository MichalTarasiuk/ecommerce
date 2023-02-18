import {useEffect, useRef} from 'react';

export const useHasMounted = () => {
  const hasMounted = useRef(false);

  useEffect(() => {
    hasMounted.current = true;

    return () => {
      hasMounted.current = false;
    };
  }, []);

  return hasMounted.current;
};
