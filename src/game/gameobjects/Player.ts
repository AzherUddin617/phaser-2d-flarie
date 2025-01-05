
export default class Player extends Phaser.Physics.Arcade.Sprite {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor (scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'dude'); // Create the sprite

        this.scene.add.existing(this); // Add the sprite to the scene
        this.scene.physics.add.existing(this); // Add the sprite to the physics world

        this.setBounce(0.2); // Set the bounce
        this.setCollideWorldBounds(true); // Set the sprite to collide with the world

        this.cursors = this.scene.input.keyboard!.createCursorKeys(); // Create the cursors

        // Create the animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    /**
     * This function is called every frame.
     * in this function we set the velocity of the player by checking the cursors inputs
     */
    update ()
    {
        if (this.cursors?.left.isDown)
        {
            this.setVelocityX(-160);

            this.anims.play('left', true);
        }
        else if (this.cursors?.right.isDown)
        {
            this.setVelocityX(160);

            this.anims.play('right', true);
        }
        else
        {
            this.setVelocityX(0);

            this.anims.play('turn');
        }

        if (this.cursors?.up.isDown && this.body?.touching.down)
        {
            this.setVelocityY(-330);
        }
    }
}