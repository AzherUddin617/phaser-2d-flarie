
export default class Stars extends Phaser.Physics.Arcade.Group {
    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene, {
            key: 'star',
            repeat: 10,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.children.iterate((child) => {
            if (child instanceof Phaser.Physics.Arcade.Sprite) {
                child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

                return true;
            }

            return false;
        });

    }
}