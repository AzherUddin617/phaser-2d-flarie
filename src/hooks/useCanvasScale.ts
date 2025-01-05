import { useState, useEffect } from 'react';
import { IRefPhaserGame } from '../game/PhaserGame';

const useCanvasScale = (canvasWidth: number, canvasHeight: number, phaserRef: React.RefObject<IRefPhaserGame>) => {
  const [scale, setScale] = useState({
    scaleX: 1,
    scaleY: 1,
  });

  useEffect(() => {
    const handleResize = () => {
      if (!phaserRef.current) {
        return;
      }

      const cWidth = phaserRef.current.scene?.scale?.canvasBounds.width || Math.min(window.innerWidth, canvasWidth);
      const cHeight = phaserRef.current.scene?.scale?.canvasBounds.height || Math.min(window.innerHeight, canvasHeight);

      const scaleX = Math.min(cWidth / canvasWidth, 1);
      const scaleY = Math.min(cHeight / canvasHeight, 1);
      setScale({ scaleX, scaleY });
    };

    // Initialize scale on mount
    handleResize();

    setTimeout(() => {
      handleResize();
    }, 1000);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasWidth, canvasHeight, phaserRef]);

  return scale;
};

export default useCanvasScale;
