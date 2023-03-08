import {ReactComponent as AccountIcon} from 'public/icons/account.svg';
import {ReactComponent as CartIcon} from 'public/icons/cart.svg';
import {ReactComponent as SearchIcon} from 'public/icons/search.svg';

export const navigationListing = {
  left: [
    {child: 'All records', href: '/1'},
    {child: 'Top Artists', href: '/2'},
    {child: 'Rock On!', href: '/3'},
  ],
  right: [
    {child: AccountIcon, href: '/4'},
    {child: CartIcon, href: '/5'},
    {child: SearchIcon, href: '/6'},
  ],
};
