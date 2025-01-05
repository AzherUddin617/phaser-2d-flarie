import { useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import { MainMenu } from './game/scenes/MainMenu';
import useCanvasScale from './hooks/useCanvasScale';

const buttonConfig = {
    buttonText: 'Start Game',
    buttonStyle: {
      color: '#FFFFFF',
      backgroundColor: '#A953FF',
      top: '75%',
      left: '50%',
      width: '70%',
      height: '48px',
      borderRadius: '8px',
      fontSize: '24px',
      transform: 'translate(-50%, -50%)', // Center the button
      position: 'absolute', // Ensure proper placement
    },
};

function App()
{
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    const scale = useCanvasScale(720, 1280, phaserRef);

    const [isMenuScene, setMenuScene] = useState(false);

    const changeScene = () => {

        if(phaserRef.current)
        {     
            const scene = phaserRef.current.scene as MainMenu;
            
            if (scene)
            {
                scene.changeScene();
            }
        }
    }

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {
        setMenuScene(scene.scene.key === 'MainMenu');
    }

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            {
                isMenuScene && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: 720,
                            height: 1280,
                            transform: `translate(-50%, -50%) scale(${scale.scaleX})`,
                        }}
                    >
                        <button style={{
                        ...buttonConfig.buttonStyle as React.CSSProperties,
                        fontWeight: 'bold',
                        font: 'Arial',
                        }} onClick={changeScene}>{buttonConfig.buttonText?.toUpperCase()}</button>
                    </div>
                )
            }
        </div>
    )
}

export default App
