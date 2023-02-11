import classNames from 'classnames';
import Link from 'next/link';

import {useUIHandler} from '@/app/contexts';
import {RenderIcon} from '@/common/components/components';
import {isLastIndex, isString, objectKeys} from '@/common/utils/utils';
import MenuIcon from 'public/icons/menu.svg';

import {navigationListing} from './consts';

type NavigationItemProps = {
  readonly title: React.FC<React.SVGProps<SVGSVGElement>> | string;
  readonly href: string;
};

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
            {navigationListing[key].map((listed, index) => {
              return (
                <li
                  key={listed.href}
                  className={classNames({
                    'hidden lg:list-item':
                      isRightColumn &&
                      isLastIndex(navigationListing[key].length, index),
                  })}
                >
                  <NavigationItem {...listed} />
                </li>
              );
            })}
            {isRightColumn && (
              <li onClick={openMenu} className={'cursor-pointer lg:hidden'}>
                <MenuIcon className='hover:text-blue-500' />
              </li>
            )}
          </ul>
        );
      })}
    </nav>
  );
}

function NavigationItem({title, href}: NavigationItemProps) {
  return (
    <Link
      href={href}
      className='hover:text-blue-500 h-full flex justify-center items-center'
    >
      <span className='align-middle'>
        {isString(title) ? title : <RenderIcon icon={title} />}
      </span>
    </Link>
  );
}
