import classNames from 'classnames';
import Link from 'next/link';
import {useCallback, useRef} from 'react';

import {useClickOutside, useLockBodyScroll} from 'lib/dom';
import {useRouteChangeStart} from 'lib/nextRouter/nextRouter';
import {useResize} from 'lib/sensor';
import {useUIState} from 'lib/ui';
import {ReactComponent as CloseIcon} from 'public/icons/close.svg';

import {navigationListing} from './consts';

export function Menu() {
  const [isMenuOpen, setUIState] = useUIState((state) => state.isMenuOpen);
  const navigationRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setUIState({isMenuOpen: false});
  }, [setUIState]);

  useResize(closeMenu);
  useRouteChangeStart(closeMenu);
  useClickOutside(navigationRef, closeMenu);

  useLockBodyScroll(isMenuOpen);

  return (
    <div
      className={classNames(
        'h-screen w-full absolute inset-0 transition-all bg-[rgb(57,64,82,.6)]',
        isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      <nav
        ref={navigationRef}
        className='h-screen max-w-sm px-8 ml-auto bg-white py-7'
      >
        <button onClick={closeMenu} className='block ml-auto'>
          <CloseIcon />
        </button>
        <ul className='flex flex-col gap-4 mt-6'>
          {navigationListing.left.map(({child, href}) => (
            <li key={href}>
              <Link href={href} className='block text-2xl font-semibold'>
                {child}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
