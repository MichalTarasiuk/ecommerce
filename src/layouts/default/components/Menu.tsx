import {useUIState} from '@/app/contexts/UIContext';

export const Menu = () => {
  const [isMenuOpen] = useUIState((state) => state.isMenuOpen);

  if (isMenuOpen) {
    return <p>loading...</p>;
  }

  return null;
};
