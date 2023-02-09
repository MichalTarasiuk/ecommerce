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
                <MenuIcon className='hover:text-blue-500' />
              </li>
            )}
          </ul>
        );
      })}
    </nav>
  );
};

const NavigationItem = ({title, href}: NavigationItemProps) => {
  const className = 'hover:text-blue-500';

  if (isString(title)) {
    return (
      <Link href={href} className={className}>
        {title}
      </Link>
    );
  }

  return (
    <Link href={href}>
      <RenderIcon icon={title} className={className} />
    </Link>
  );
};
