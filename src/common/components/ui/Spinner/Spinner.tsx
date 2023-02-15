import RefreshIcon from 'public/icons/refresh.svg';

export function Spinner() {
  return (
    <div className='flex justify-center items-center'>
      <RefreshIcon className='animate-spin w-5 h-5' />
    </div>
  );
}
