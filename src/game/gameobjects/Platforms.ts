
export default class Platforms extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene);

        this.create(0, this.scene.scale.height, 'ground').setOrigin(0, 1).setScale(2).refreshBody();
    }
}