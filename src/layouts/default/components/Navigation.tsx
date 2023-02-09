import classNames from 'classnames';
import Link from 'next/link';

import {useUIHandler} from '@/app/contexts/contexts';
import {RenderIcon} from '@/common/components/components';
import {isLastIndex, isString, objectKeys} from '@/common/utils/utils';
import MenuIcon from 'public/icons/menu.svg';

import {navigationListing} from './consts';

type NavigationItemProps = {
  readonly title: React.FC<React.SVGProps<SVGSVGElement>> | string;
  readonly href: string;
};

export const Navigation = () => {
  const setUIstate = useUIHandler();

  const openMenu = () => {
    setUIstate({isMenuOpen: true});
  };

  return (
    <nav className='flex items-center justify-between'>
      {objectKeys(navigationListing).map((key) => {
        const isLeftColumn = key === 'left';
        const isRightColumn = key === 'right';

        return (
          <ul
            key={key}
            className={classNames('flex py-7 ', {
              'gap-5 hidden lg:flex': isLeftColumn,
              'gap-3.5 ml-auto': isRightColumn,
            })}
          >
            {navigationListing[key].map((listed, index) => {
              return (
                <li
                  key={listed.href}
                  className={classNames({
                    'hidden lg:block':
                      isRightColumn &&
                      isLastIndex(navigationListing[key].length, index),
                  })}
                >
                  <NavigationItem {...listed} />
                </li>
              );
            })}
            {isRightColumn && (
              <li onClick={openMenu} className='cursor-pointer block lg:hidden'>
                <MenuIcon />
              </li>
            )}
          </ul>
        );
      })}
    </nav>
  );
};

const NavigationItem = ({title, href}: NavigationItemProps) => {
  if (isString(title)) {
    return (
      <Link href={href} className='hover:text-blue-500 h-max'>
        {title}
      </Link>
    );
  }

  return (
    <Link href={href}>
      <RenderIcon icon={title} />
    </Link>
  );
};
