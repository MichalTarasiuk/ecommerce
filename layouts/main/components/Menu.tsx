import classNames from 'classnames';
import Link from 'next/link';
import {useCallback, useRef} from 'react';

import {ReactComponent as CloseIcon} from 'public/icons/close.svg';
import {useUIState} from '~app/contexts/contexts';
import {useClickOutside, useLockBodyScroll} from '~composables/dom/dom';
import {useRouteChangeStart} from '~composables/router/router';
import {useResize} from '~composables/sensor';

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
        className='h-screen max-w-sm ml-auto py-7 px-8 bg-white'
      >
        <button onClick={closeMenu} className='ml-auto block'>
          <CloseIcon />
        </button>
        <ul className='flex flex-col mt-6 gap-4'>
          {navigationListing.left.map(({child, href}) => (
            <li key={href}>
              <Link href={href} className='text-2xl block font-semibold'>
                {child}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
