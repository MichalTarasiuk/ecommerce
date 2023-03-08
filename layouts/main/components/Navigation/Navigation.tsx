import classNames from 'classnames';

import {useUIHandler} from 'lib/ui';
import {ReactComponent as MenuIcon} from 'public/icons/menu.svg';
import {isLastIndex, objectKeys} from 'utils/utils';

import {navigationListing} from '../consts';

import {NavigationItem} from './NavigationItem';

export function Navigation() {
  const setUIstate = useUIHandler();

  const openMenu = () => {
    setUIstate({isMenuOpen: true});
  };

  return (
    <nav className='flex h-20 items-center justify-between'>
      {objectKeys(navigationListing).map((key) => {
        const isLeftColumn = key === 'left';
        const isRightColumn = key === 'right';

        return (
          <ul
            key={key}
            className={classNames('flex', {
              'gap-5 hidden lg:flex h-full': isLeftColumn,
              'gap-3.5 ml-auto': isRightColumn,
            })}
          >
            {navigationListing[key].map((listed, index) => (
              <li
                key={listed.href}
                className={classNames({
                  'hidden lg:list-item':
                    isRightColumn &&
                    isLastIndex(navigationListing[key].length, index),
                })}
              >
                <NavigationItem type='link' {...listed} />
              </li>
            ))}
            {isRightColumn && (
              <li className='lg:hidden'>
                <NavigationItem
                  type='button'
                  child={MenuIcon}
                  onClick={openMenu}
                />
              </li>
            )}
          </ul>
        );
      })}
    </nav>
  );
}
