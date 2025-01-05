
export default class Platforms extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene);

        // Create the ground
        this.create(0, this.scene.scale.height, 'ground').setOrigin(0, 1).setScale(2).refreshBody();

        // Create the platforms grounds
        this.create(200, this.scene.scale.height - 200, 'ground')
        this.create(750, this.scene.scale.height - 300, 'ground')
        this.create(100, this.scene.scale.height - 350, 'ground')
        this.create(0, this.scene.scale.height - 500, 'ground')
        this.create(-150, this.scene.scale.height - 600, 'ground')
        this.create(850, this.scene.scale.height - 450, 'ground')
    }
}