import {useTranslate} from 'lib/translate/translate';
import {ReactComponent as RefreshIcon} from 'public/icons/refresh.svg';

import {Text} from '../Text/Text';
import {VisuallyHidden} from '../VisuallyHidden/VisuallyHidden';

export function Spinner() {
  const {translate} = useTranslate('common');

  return (
    <div className='flex items-center justify-center'>
      <VisuallyHidden>
        <Text tag='p' size='small'>
          {translate('loading')}
        </Text>
      </VisuallyHidden>
      <RefreshIcon className='w-5 h-5 animate-spin' />
    </div>
  );
}
