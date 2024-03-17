import type { FC, ImgHTMLAttributes, SVGProps } from "react";

import * as Icons from "./icon";

const colors = {
  black: "[&_*]:fill-black [&_*]:stroke-black [&_*]:dark:fill-white [&_*]:dark:stroke-white",
  white: "[&_*]:fill-white [&_*]:stroke-white",
  default: "",
};

interface SvgProps extends SVGProps<SVGSVGElement> {
  name: keyof typeof Icons;
  color?: keyof typeof colors;
}

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  color?: keyof typeof colors;
}

type Props = SvgProps | ImgProps;

export const Icon = ({ color = "black", ...rest }: Props) => {
  if ("src" in rest) {
    const { src, alt, ...imageProps } = rest as ImgProps;
    return <img src={src} alt={alt || src} {...imageProps} />;
  }

  const { name, ...svgProps } = rest as SvgProps;
  const Svg = Icons[name] as FC<SVGProps<SVGSVGElement>>;

  return <Svg className={colors[color] as string} {...svgProps} />;
};
