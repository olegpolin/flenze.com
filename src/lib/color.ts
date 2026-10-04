/** Colour conversions for the tools. A colour is three sRGB channels, 0 to 255. */
export type Rgb = [number, number, number];

/** Rounds to `digits` decimals and drops trailing zeros. */
function round(value: number, digits: number) {
  return Number(value.toFixed(digits));
}

export function toHex(rgb: Rgb) {
  return `#${rgb.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
}

export function toRgb([r, g, b]: Rgb) {
  return `rgb(${r} ${g} ${b})`;
}

export function toHsl(rgb: Rgb) {
  const [r, g, b] = rgb.map((channel) => channel / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
  }
  return `hsl(${round((h * 60 + 360) % 360, 0)} ${round(s * 100, 0)}% ${round(l * 100, 0)}%)`;
}

/** sRGB to OKLab, as [lightness, a, b]. Björn Ottosson's matrices. */
function toOklab(rgb: Rgb) {
  const [r, g, b] = rgb.map((channel) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  ];
}

export function toOklch(rgb: Rgb) {
  const [l, a, b] = toOklab(rgb);
  const chroma = round(Math.hypot(a, b), 3);
  // A grey has no hue; atan2 of two near-zero numbers is noise.
  const hue = chroma === 0 ? 0 : round(((Math.atan2(b, a) * 180) / Math.PI + 360) % 360, 1);
  return `oklch(${round(l, 3)} ${chroma} ${hue})`;
}

/** Whether dark text reads better than light text on this colour. */
export function isLight(rgb: Rgb) {
  return toOklab(rgb)[0] > 0.6;
}
