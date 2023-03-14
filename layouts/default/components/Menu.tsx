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
        'absolute inset-0 h-screen w-full bg-[rgb(57,64,82,.6)] transition-all',
        isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      <nav
        ref={navigationRef}
        className='ml-auto h-screen max-w-sm bg-white px-8 py-7'
      >
        <button onClick={closeMenu} className='ml-auto block'>
          <CloseIcon />
        </button>
        <ul className='mt-6 flex flex-col gap-4'>
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
