import { useState, useEffect } from 'react';
import { IRefPhaserGame } from '../game/PhaserGame';

/**
 * Calculate the scale factors for the canvas
 * @param canvasWidth
 * @param canvasHeight
 * @returns
 */
const getCanvasScale = (canvasWidth: number, canvasHeight: number) => {
  // Calculate scale factors
  const scaleX = window.innerWidth / canvasWidth;
  const scaleY = window.innerHeight / canvasHeight;

  // Use the smaller scale factor to maintain aspect ratio
  const scale = Math.min(scaleX, scaleY);

  // Calculate the current canvas size
  const currentWidth = canvasWidth * scale;
  const currentHeight = canvasHeight * scale;

  return {
    scaleX: Math.min(currentWidth / canvasWidth, 1), // Calculate scale X factors
    scaleY: Math.min(currentHeight / canvasHeight, 1), // Calculate scale Y factors
  };
};

const useCanvasScale = (canvasWidth: number, canvasHeight: number, phaserRef: React.RefObject<IRefPhaserGame>) => {
  const [scale, setScale] = useState(getCanvasScale(canvasWidth, canvasHeight)); // State to store scale factors

  useEffect(() => {
    const handleResize = () => {
      if (!phaserRef.current) {
        return; // Exit if phaserRef is not available
      }

      const cWidth = phaserRef.current.scene?.scale?.canvasBounds.width || Math.min(window.innerWidth, canvasWidth); // Get the current canvas width
      const cHeight = phaserRef.current.scene?.scale?.canvasBounds.height || Math.min(window.innerHeight, canvasHeight); // Get the current canvas height

      const scaleX = Math.min(cWidth / canvasWidth, 1); // Calculate scale X factors
      const scaleY = Math.min(cHeight / canvasHeight, 1); // Calculate scale Y factors
      setScale({ scaleX, scaleY });
    };

    // Initialize scale on mount
    handleResize();

    // Update scale after a short delay to ensure the scene is ready
    setTimeout(() => {
      handleResize();
    }, 1000);

    window.addEventListener('resize', handleResize); // Add resize event listener

    return () => {
      window.removeEventListener('resize', handleResize); // Remove resize event listener on unmount
    };
  }, [canvasWidth, canvasHeight, phaserRef]);

  return scale;
};

export default useCanvasScale;
