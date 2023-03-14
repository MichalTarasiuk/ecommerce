import {none} from 'constants/constants';

export const remvoeInteractivePseudoClasses = (className: string) =>
  className.replace(/(focus|hover|active):[\w-]+/g, none);
