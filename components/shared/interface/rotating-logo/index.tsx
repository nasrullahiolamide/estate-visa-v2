"use client";

import { Box, Flex, FlexProps } from "@mantine/core";
import { divide, isString, multiply, round } from "lodash";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

type Size = {
  width: CSSProperties["width"];
  height: CSSProperties["height"];
};

interface RotatingLogoProps extends FlexProps {
  text: ReactNode[];
  fontSize?: number;
  size?: number;
}

export function RotatingLogo({
  text,
  size = 128,
  fontSize = 7,
  style,
  children,
  ...props
}: RotatingLogoProps) {
  const [dimension, setDimension] = useState<Size>({
    width: "auto",
    height: "auto",
  });

  const ref = useRef<HTMLDivElement>(null);
  const base = text.flatMap((item) => {
    const element = isString(item) ? item.split("") : [item];
    return [" ", ...element];
  });

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const width = Array.from(container.childNodes).reduce((size, child) => {
      if (child instanceof HTMLElement) {
        const { width } = child.getBoundingClientRect();
        size = Math.max(size, width);
      }
      return size;
    }, 0);

    const { height } = container.getBoundingClientRect();

    setDimension({
      height,
      width,
    });
  }, []);

  return (
    <Flex
      justify='center'
      align='center'
      c='blue.8'
      className='circle'
      {...props}
      style={{
        width: size,
        position: "relative",
        borderRadius: "50%",
        overflow: "hidden",
        height: size,
        ...style,
      }}
    >
      {children}

      <Flex
        ref={ref}
        tt='capitalize'
        fw={500}
        justify='center'
        align='center'
        pos='absolute'
        style={{ fontSize, visibility: "hidden", whiteSpace: "nowrap" }}
      >
        {base.map((character, index) => {
          return <span key={index}>{character}</span>;
        })}
      </Flex>

      <Box
        w='100%'
        pos='absolute'
        tt='capitalize'
        fw={500}
        h='100%'
        className='rotating'
      >
        {base.map((character, index, { length }) => {
          const degree = divide(360, length);
          const rotation = round(multiply(index, degree));

          return (
            <span
              key={index}
              style={{
                ...dimension,
                position: "absolute",
                transformOrigin: `0 ${divide(size, 2)}px`,
                fontSize,
                justifyContent: "center",
                alignItems: "center",
                transform: `rotate(${rotation}deg)`,
                display: "flex",
                left: "50%",
              }}
            >
              {character}
            </span>
          );
        })}
      </Box>
    </Flex>
  );
}
