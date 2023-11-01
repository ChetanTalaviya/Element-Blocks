
window.addEventListener('load', function () {

	this.game = new Phaser.Game({
		// width: window.innerWidth >= 820 ? 1280 : window.innerWidth,
		// height: window.innerWi/dth >= 820 ? 720 : window.innerHeight,
		width: 1280,
		height: 720,
		type: Phaser.AUTO,
		backgroundColor: "#242424",
		transparent: true,
		parent:'game-division',

		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	});

	this.game.scene.add("Preload", Preload);
	this.game.scene.add("Level", Level);
	this.game.scene.add("Boot", Boot, true);
});

class Boot extends Phaser.Scene {

	preload() {

		this.load.pack("pack", "assets/preload-asset-pack.json");
	}

	create() {

		this.scene.start("Preload");
	}
}