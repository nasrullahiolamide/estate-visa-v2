"use client";

import { Box, BoxProps } from "@mantine/core";
import Image, { ImageProps } from "next/image";
import { forwardRef } from "react";

type PictureProps = Omit<BoxProps, keyof ImageProps> &
  Omit<ImageProps, "src" | "alt" | "width" | "height"> &
  Partial<{
    src: string;
    alt: string;
    width: number | string;
    height: number | string;
    optimize: boolean;
    objectFit: "contain" | "cover" | "fill" | "none" | "scale-down";
  }>;

export const Picture = forwardRef<HTMLImageElement, PictureProps>(
  (props, ref) => {
    const {
      src,
      alt = "",
      width = "auto",
      height = "auto",
      fill = true,
      loader,
      quality,
      priority,
      loading,
      placeholder,
      blurDataURL,
      optimize = false,
      unoptimized = !optimize,
      overrideSrc,
      style,
      objectFit = "contain",
      ...boxProps
    } = props;

    if (!src) return null;

    return (
      <Box
        ref={ref}
        component="picture"
        style={{
          aspectRatio: "1",
          position: "relative",
          width,
          height,
          ...style,
        }}
        {...boxProps}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          loader={loader}
          quality={quality}
          priority={priority}
          loading={loading}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          unoptimized={unoptimized}
          overrideSrc={overrideSrc}
          className="rounded-lg"
          style={{
            objectFit,
          }}
        />
      </Box>
    );
  },
);
