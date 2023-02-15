import RefreshIcon from 'public/icons/refresh.svg';

export function Spinner() {
  return (
    <div className='flex justify-center items-center'>
      <RefreshIcon className='animate-spin w-5 h-5' />
    </div>
  );
}

// import {useTranslate} from '@/common/hooks/hooks';

// import {Text} from '../Text/Text';
// import {VisuallyHidden} from '../VisuallyHidden/VisuallyHidden';

// export function Spinner() {
//   const {translate} = useTranslate('common');

//   return (
//     <div className='flex justify-center items-center'>
//       <VisuallyHidden>
//         <Text tag='p' size='small'>
//           {translate('loading')}
//         </Text>
//       </VisuallyHidden>
//       <RefreshIcon className='animate-spin w-5 h-5' />
//     </div>
//   );
// }
