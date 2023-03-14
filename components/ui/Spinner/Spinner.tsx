import {useTranslate} from 'lib/translate/translate';
import {ReactComponent as RefreshIcon} from 'public/icons/refresh.svg';

import {Paragraph} from '../Text/Text';
import {VisuallyHidden} from '../VisuallyHidden/VisuallyHidden';

export function Spinner() {
  const {translate} = useTranslate('common');

  return (
    <div className='flex items-center justify-center'>
      <VisuallyHidden>
        <Paragraph size='small'>{translate('loading')}</Paragraph>
      </VisuallyHidden>
      <RefreshIcon className='h-5 w-5 animate-spin' />
    </div>
  );
}
