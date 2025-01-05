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
        EventBus.emit('current-scene-ready', this);

        this.add.image(0, 0, 'sky').setOrigin(0, 0).setScale(2.1);

        // this.platforms = this.physics.add.staticGroup();
        this.platforms = new Platforms(this);

        this.player = new Player(this, 100, this.scale.height - 150);

        this.stars = new Stars(this);

        this.bombs = this.physics.add.group();

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', backgroundColor: '#000' });

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(this.player, this.stars, this.collectStar, undefined, this);

        this.physics.add.overlap(this.player, this.bombs, this.hitBomb, undefined, this);
    }

    update ()
    {
        this.player.update();
    }

    collectStar: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback = (player, star) =>
    {
        (star as unknown as Phaser.Physics.Arcade.Image)?.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

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
        
                const bomb = this.bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
                bomb.allowGravity = false;
        
            }
    }
    
    hitBomb: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback = (player) =>
    {
        this.physics.pause();

        (player as unknown as Phaser.Physics.Arcade.Image)?.setTint(0xff0000);

        (player as unknown as Phaser.Physics.Arcade.Sprite)?.anims.play('turn');

        this.changeScene();
    }

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
