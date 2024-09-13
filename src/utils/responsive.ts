import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on figma design's scale
// const scale = SCREEN_WIDTH / 394;

// export const normalize = (size: number) => {
//     const newSize = size * scale
//     if (Platform.OS === 'ios') {
//         return Math.round(PixelRatio.roundToNearestPixel(newSize))
//     } else {
//         return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
//     }
// }

// globalThis.responsive = normalize

const BASE_WIDTH = 394;
const BASE_HEIGHT = 854.17;

const IS_PORTAIT = SCREEN_HEIGHT > SCREEN_WIDTH;
const realWidth = IS_PORTAIT ? SCREEN_WIDTH : SCREEN_HEIGHT;
const baseWidth = IS_PORTAIT ? BASE_WIDTH : BASE_HEIGHT;
/**
 * Virtual point converter - cares of responsive layout rendering
 * Calculates the sizes depends on current screen width
 * Base width is 375 - same to UI provided
 * When to use:
 * - no way to use flex
 * - no way to use percentage
 * - you are rendering images
 * - you are using numbers for layout
 * @param size: number - the desired size in pixels for a screen of width 375px
 * @returns number - the converted size in pt
 */
const vp = (size: number): number => Math.round((size * realWidth) / baseWidth);

globalThis.vp = vp;
