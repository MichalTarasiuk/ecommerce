import {useTranslate} from '@/common/hooks/hooks';
import {ReactComponent as RefreshIcon} from 'public/icons/refresh.svg';

import {Text} from '../Text/Text';
import {VisuallyHidden} from '../VisuallyHidden/VisuallyHidden';

export function Spinner() {
  const {translate} = useTranslate('account.forgot-password');

  return (
    <div className='flex justify-center items-center'>
      <VisuallyHidden>
        <Text tag='p' size='small'>
          {translate('form.email')}
        </Text>
      </VisuallyHidden>
      <RefreshIcon className='animate-spin w-5 h-5' />
    </div>
  );
}
