
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
		progressBarBg.visible = false;
		progressBarBg.fillColor = 14737632;
		progressBarBg.isStroked = true;

		// play_btn
		const play_btn = this.add.image(640, 530, "Play-btn");
		play_btn.visible = false;

		// logo
		const logo = this.add.image(640, 214, "Logo");
		logo.scaleX = 0.7;
		logo.scaleY = 0.7;

		// container_progressBar
		const container_progressBar = this.add.container(0, 0);

		// outerBar
		const outerBar = this.add.image(640, 524, "outerBar");
		container_progressBar.add(outerBar);

		// innerBar
		const innerBar = this.add.image(442, 525, "innerBar");
		innerBar.scaleY = 0.9;
		innerBar.setOrigin(0, 0.5);
		container_progressBar.add(innerBar);

		// loadingText
		const loadingText = this.add.text(596, 510, "", {});
		loadingText.visible = false;
		loadingText.text = "Loading...";
		loadingText.setStyle({ "color": "#e0e0e0", "fontFamily": "arial", "fontSize": "25px" });
		container_progressBar.add(loadingText);

		// txt_progress
		const txt_progress = this.add.text(633, 510, "", {});
		txt_progress.text = "0";
		txt_progress.setStyle({ "color": "#e0e0e0", "fontFamily": "arial", "fontSize": "25px" });
		container_progressBar.add(txt_progress);

		this.play_btn = play_btn;
		this.logo = logo;
		this.outerBar = outerBar;
		this.innerBar = innerBar;
		this.txt_progress = txt_progress;
		this.container_progressBar = container_progressBar;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	play_btn;
	/** @type {Phaser.GameObjects.Image} */
	logo;
	/** @type {Phaser.GameObjects.Image} */
	outerBar;
	/** @type {Phaser.GameObjects.Image} */
	innerBar;
	/** @type {Phaser.GameObjects.Text} */
	txt_progress;
	/** @type {Phaser.GameObjects.Container} */
	container_progressBar;

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.editorPreload();
		let isStart = false;

		if (window.innerWidth <= 820) {
			this.play_btn.x = 150;
		}

		// this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Level"));
		this.load.once(Phaser.Loader.Events.COMPLETE, () => isStart = true);


		this.play_btn.setInteractive().on('pointerdown', () => {
			if (window.innerWidth <= 820) {
				this.openFullscreen();
			}
			this.scene.start("Level");

		});


		const maskGraphics = this.make.graphics().fillStyle(0xffffff).fillRect(this.innerBar.x, this.innerBar.y - this.innerBar.displayHeight / 2, this.innerBar.displayWidth, this.innerBar.displayHeight);
		this.innerBar.setMask(maskGraphics.createGeometryMask());

		const loadingDuration = 2200;
		const intervalDuration = 40;
		const numIntervals = loadingDuration / intervalDuration;
		const progressIncrement = 1 / numIntervals;

		const updateProgressBar = () => {
			this.innerBar.visible = true;
			const currentProgress = currentInterval * progressIncrement;
			maskGraphics.clear().fillStyle(0xffffff).fillRect(this.innerBar.x, this.innerBar.y - this.innerBar.displayHeight / 2, this.innerBar.displayWidth * currentProgress, this.innerBar.displayHeight);
			if (currentProgress >= 1 && isStart) {
				clearInterval(progressInterval);
				this.play_btn.visible = true;
				this.container_progressBar.visible = false;
				if (window.innerWidth < 1080) {
					this.tweenAnimations(this.logo, 0.5, 0.55);
				} else {
					this.tweenAnimations(this.logo, 0.7, 0.75);
				}

				this.tweenAnimation(this.play_btn, 0.9, 1);
			} else {
				this.txt_progress.setText((currentProgress * 100 > 100 ? 100 : currentProgress * 100).toFixed(0) + '%');
			}
			currentInterval++;
		};
		let currentInterval = 0;

		const progressInterval = setInterval(updateProgressBar, intervalDuration);



	}
	tweenAnimation(img, min, max) {
		this.tweens.add({
			targets: img,
			scaleY: { from: min, to: max },
			duration: 1000,
			yoyo: true,
			repeat: -1,
		});
	}
	tweenAnimations(img, min, max) {
		this.tweens.add({
			targets: img,
			scale: { from: min, to: max },
			duration: 1000,
			yoyo: true,
			repeat: -1,
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
