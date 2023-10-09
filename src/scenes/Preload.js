
// You can write more code here

/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// progressBar
		const progressBar = this.add.rectangle(553.0120849609375, 361, 256, 20);
		progressBar.setOrigin(0, 0);
		progressBar.visible = false;
		progressBar.isFilled = true;
		progressBar.fillColor = 14737632;

		// preloadUpdater
		new PreloadBarUpdaterScript(progressBar);

		// progressBarBg
		const progressBarBg = this.add.rectangle(553.0120849609375, 361, 256, 20);
		progressBarBg.setOrigin(0, 0);
		progressBarBg.fillColor = 14737632;
		progressBarBg.isStroked = true;

		// loadingText
		const loadingText = this.add.text(552.0120849609375, 329, "", {});
		loadingText.visible = false;
		loadingText.text = "Loading...";
		loadingText.setStyle({ "color": "#e0e0e0", "fontFamily": "arial", "fontSize": "20px" });

		// play_btn
		const play_btn = this.add.image(640, 360, "Play-btn");
		play_btn.visible = false;

		this.play_btn = play_btn;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	play_btn;

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.editorPreload();
		if (window.innerWidth <= 820) {
			this.play_btn.x = 150;
		}

		// this.load.on(Phaser.Loader.Events.COMPLETE, () => this.play_btn.setVisible(true));
		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Level"));

		this.play_btn.setInteractive().on('pointerdown', () => {
			if (window.innerWidth <= 820) {
				this.openFullscreen();
			}
			this.scene.start("Level");

		});

	}
	openFullscreen() {
		var element = this.game.canvas;
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.mozRequestFullScreen) { // Firefox
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullscreen) { // Chrome, Safari, and Opera
			element.webkitRequestFullscreen();
		} else if (element.msRequestFullscreen) { // IE/Edge
			element.msRequestFullscreen();
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
