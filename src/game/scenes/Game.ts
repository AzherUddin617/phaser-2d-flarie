import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import Player from '../gameobjects/Player';
import Platforms from '../gameobjects/Platforms';
import Stars from '../gameobjects/Stars';

export class Game extends Scene
{
    platforms: Phaser.Physics.Arcade.StaticGroup;
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    stars: Phaser.Physics.Arcade.Group;
    bombs: Phaser.Physics.Arcade.Group;

    score = 0;
    scoreText: Phaser.GameObjects.Text;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        EventBus.emit('current-scene-ready', this); // Emit an event to notify other components that the scene is ready

        this.add.image(0, 0, 'sky').setOrigin(0, 0).setScale(2.1);

        this.platforms = new Platforms(this); // Create the platforms

        this.player = new Player(this, 100, this.scale.height - 150); // Create the player

        this.stars = new Stars(this); // Create the stars

        this.bombs = this.physics.add.group(); // Create the bombs

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', backgroundColor: '#000' }); // Create the score text

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(this.player, this.stars, this.collectStar, undefined, this);

        //  Checks to see if the player overlaps with any of the bombs, if he does call the hitBomb function
        this.physics.add.overlap(this.player, this.bombs, this.hitBomb, undefined, this);
    }

    update ()
    {
        this.player.update(); // Update the player
    }

    /**
    * This function is called when the player overlaps with a star.
    */
    collectStar: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback = (player, star) =>
    {
        (star as unknown as Phaser.Physics.Arcade.Image)?.disableBody(true, true);

        this.score += 10; // Add and update the score
        this.scoreText.setText('Score: ' + this.score); // Update the score text

        //  The first parameter is the Event emitted from the Sprite (in this case 'star')
        //  The second parameter is optional and is the context under which the listener is to be called
        if (this.stars.countActive(true) === 0)
            {
                //  A new batch of stars to collect
                this.stars.children.iterate((child) => {

                    if (child instanceof Phaser.Physics.Arcade.Sprite) {
        
                        child.enableBody(true, child.x, 0, true, true);
            
                        return true;
                    }

                    return false;
                });
        
                const x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        
                const bomb = this.bombs.create(x, 16, 'bomb'); // Create a bomb

                bomb.setBounce(1); // Make the bomb bouncy
                bomb.setCollideWorldBounds(true); // So the bomb doesn't go out of the world
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20); // Give it a random x velocity
                bomb.allowGravity = false; // Make the bomb not fall
        
            }
    }
    
    /**
    * This function is called when the player overlaps with a bomb.
    */
    hitBomb: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback = (player) =>
    {
        this.physics.pause();

        (player as unknown as Phaser.Physics.Arcade.Image)?.setTint(0xff0000);

        (player as unknown as Phaser.Physics.Arcade.Sprite)?.anims.play('turn');

        this.changeScene();
    }

    /**
     * This function is called when the player overlaps with a bomb.
     */
    changeScene ()
    {
        // pause game
        this.scene.pause('Game');

        setTimeout(() =>
        {
            this.scene.start('MainMenu');
        }, 1000);
    }
}
