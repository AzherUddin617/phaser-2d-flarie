import { GameObjects, Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
    background: GameObjects.Image;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(0, 0, 'bg-menu').setOrigin(0, 0); // Add the background image

        EventBus.emit('current-scene-ready', this); // Emit an event to notify other components that the scene is ready
    }

    changeScene ()
    {
        this.scene.start('Game');
    }
}
