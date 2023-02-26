import {none, signs} from '@/common/consts/consts';

type AnyPlaceholderValue = `::${string}::`;
type Placeholder = Record<string, AnyPlaceholderValue>;

const placeholder = {
  color: '::color::',
  height: '::height::',
} satisfies Placeholder;

const marker = signs.colon.repeat(2);
const placeholderValues = Object.keys(placeholder);

type PlaceholderValue = Custom.ValueOf<typeof placeholder>;

export const isPlaceholderValue = (value: string): value is PlaceholderValue =>
  placeholderValues.includes(value);

type ExtractPlaceholderName<PlaceholderValue> =
  PlaceholderValue extends `::${infer Name extends string}::` ? Name : never;

export const extractPlaceholderName = (placeholderValue: PlaceholderValue) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- narrow type down
  placeholderValue.replace(
    marker,
    none,
  ) as ExtractPlaceholderName<PlaceholderValue>;

export const styles = `
#nprogress {
  pointer-events: none;
}
#nprogress .bar {
  background: ${placeholder.color};
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: ${placeholder.height};
}
#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px ${placeholder.color}, 0 0 5px ${placeholder.color};
  opacity: 1;
  -webkit-transform: rotate(3deg) translate(0px, -4px);
  -ms-transform: rotate(3deg) translate(0px, -4px);
  transform: rotate(3deg) translate(0px, -4px);
}
#nprogress .spinner {
  display: block;
  position: fixed;
  z-index: 1031;
  top: 15px;
  right: 15px;
}
#nprogress .spinner-icon {
  width: 18px;
  height: 18px;
  box-sizing: border-box;
  border: solid 2px transparent;
  border-top-color: ${placeholder.color};
  border-left-color: ${placeholder.color};
  border-radius: 50%;
  -webkit-animation: nprogresss-spinner 400ms linear infinite;
  animation: nprogress-spinner 400ms linear infinite;
}
.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}
.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}
@-webkit-keyframes nprogress-spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes nprogress-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}`;
