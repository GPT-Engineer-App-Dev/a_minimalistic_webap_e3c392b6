import React, { useEffect, useRef } from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";

const Index = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    const maxIterations = 100;
    const zoom = 200;
    const offsetX = -0.5;
    const offsetY = 0;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let real = (x - width / 2) / zoom + offsetX;
        let imag = (y - height / 2) / zoom + offsetY;
        let cx = real;
        let cy = imag;
        let i = 0;

        while (i < maxIterations) {
          const tempReal = real * real - imag * imag + cx;
          imag = 2 * real * imag + cy;
          real = tempReal;

          if (real * real + imag * imag > 4) {
            break;
          }

          i++;
        }

        const color = i === maxIterations ? 0 : (i / maxIterations) * 255;
        ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, []);

  return (
    <VStack spacing={6} p={6}>
      <Heading>Mandelbrot Set</Heading>
      <Box borderWidth={1} borderRadius="md" overflow="hidden">
        <canvas ref={canvasRef} width={800} height={600} />
      </Box>
    </VStack>
  );
};

export default Index;
