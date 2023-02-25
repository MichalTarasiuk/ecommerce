import {extractPlaceholderName, isPlaceholderValue, styles} from './styles';

type HSLColor = `hsl(${number},${number}%,${number}%)`;
type Height = `${number}px`;

type GetStylesConfig = {
  readonly color: HSLColor;
  readonly height: Height;
};

export const getStyles = (config: GetStylesConfig) => {
  return styles.replaceAll(
    /::(\w+)::/g,
    (_substring, maybePlaceholderName: string) => {
      if (isPlaceholderValue(maybePlaceholderName)) {
        const placeholderName = extractPlaceholderName(maybePlaceholderName);

        return config[placeholderName];
      }

      return maybePlaceholderName;
    },
  );
};

export const routeProgressConfig = {
  startPosition: 0.3,
  showSpinner: false,
  color: 'hsl(234, 72%, 63%)' satisfies HSLColor,
  height: `5px` satisfies Height,
} as const;
