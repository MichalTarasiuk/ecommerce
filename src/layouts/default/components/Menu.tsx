import Link from 'next/link';
import {useCallback, useRef} from 'react';

import {useUIState} from '@/app/contexts';
import {useClickOutside} from '@/common/hooks/useClickOutside';
import {useResize} from '@/common/hooks/useResize';
import CloseIcon from 'public/icons/close.svg';

import {navigationListing} from './consts';

export const Menu = () => {
  const [isMenuOpen, setUIState] = useUIState((state) => state.isMenuOpen);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setUIState({isMenuOpen: false});
  }, [setUIState]);

  useClickOutside(menuRef, closeMenu);
  useResize(closeMenu);

  if (isMenuOpen) {
    return (
      <div className='h-screen w-full bg-[rgb(57,64,82,.6)] absolute inset-0'>
        <div
          ref={menuRef}
          className='h-screen bg-white max-w-sm ml-auto py-7 px-9'
        >
          <CloseIcon onClick={closeMenu} className='ml-auto cursor-pointer' />
          <ul className='flex flex-col mt-2 gap-3'>
            {navigationListing.left.map(({title, href}) => {
              return (
                <li key={href}>
                  <Link href={href} className='text-2xl'>
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  return null;
};
