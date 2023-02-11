import classNames from 'classnames';
import Link from 'next/link';
import {useCallback, useRef} from 'react';

import {useUIState} from '@/app/contexts';
import {useLockBodyScroll, useClickOutside} from '@/common/hooks/hooks';
import {useResize} from '@/common/hooks/useResize';
import {useRouteChangeStart} from '@/common/hooks/useRouteChangeStart';
import CloseIcon from 'public/icons/close.svg';

import {navigationListing} from './consts';

export function Menu() {
  const [isMenuOpen, setUIState] = useUIState((state) => state.isMenuOpen);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setUIState({isMenuOpen: false});
  }, [setUIState]);

  useResize(closeMenu);
  useRouteChangeStart(closeMenu);
  useClickOutside(menuRef, closeMenu);

  useLockBodyScroll(isMenuOpen);

  return (
    <div
      className={classNames(
        'h-screen w-full absolute inset-0 transition-opacity bg-[rgb(57,64,82,.6)]',
        isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      <div
        ref={menuRef}
        className='h-screen max-w-sm ml-auto py-7 px-8 bg-white'
      >
        <CloseIcon onClick={closeMenu} className='ml-auto cursor-pointer' />
        <ul className='flex flex-col mt-6 gap-4'>
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
