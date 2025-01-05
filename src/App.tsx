import { useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import { MainMenu } from './game/scenes/MainMenu';
import useCanvasScale from './hooks/useCanvasScale';
import { buttonConfig } from './button-config';
import { GAME_HEIGHT, GAME_WIDTH } from './game/main';

/**
 * Main application component that initializes and renders the game.
 * @returns {JSX.Element} The rendered application component.
 */
function App() 
{
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    const scale = useCanvasScale(GAME_WIDTH, GAME_HEIGHT, phaserRef); // Use the useCanvasScale hook to get the canvas scale

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
        setMenuScene(scene.scene.key === 'MainMenu'); // Check if the current scene is the MainMenu
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
                            transform: `translate(-50%, -50%) scale(${scale.scaleX})`, // Apply the canvas scale to menu ui
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
