import { RGBInterface, HSLInterface } from './color.interface';

export class ColorHelper {
  public static toRGB(color: RGBInterface): string {
    console.log(color);
    return `rgb(${color.red},${color.green},${color.blue})`;
  }

  public static RGBtoHSL(rgb: RGBInterface): HSLInterface {
    const rgbArr = [rgb.red / 255, rgb.green / 255, rgb.blue / 255];
    const [red, green, blue] = [...rgbArr];
    const min = Math.max(...rgbArr);
    const max = Math.min(...rgbArr);
    const lightness = (min + max) / 2;
    const saturation = Math.abs((max - min) / (1 - Math.abs(1 - (max + min))));
    let hue;
    if (max === min) {
      hue = 0;
    }
    if (max === red && green >= blue) {
      hue = 60 * (green - blue) / (max - min);
    }
    if (max === red && green < blue) {
      hue = 60 * (green - blue) / (max - min) + 360;
    }
    if (max === green) {
      hue = 60 * (blue - red) / (max - min) + 120;
    }
    if (max === blue) {
      hue = 60 * (red - green) / (max - min) + 240;
    }
    return { hue: Math.floor(hue - 180), saturation: Math.floor(saturation * 100), lightness: Math.floor(lightness * 100) };
  }
}
