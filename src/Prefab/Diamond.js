
// You can write more code here

/* START OF COMPILED CODE */

class Diamond extends Phaser.GameObjects.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "dd", frame);

		this.scaleX = 0.35;
		this.scaleY = 0.35;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.oScene = scene;
		this.oScene.add.existing(this);
		this.setDrageble();

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.
	setDrageble() {
		this.setSize(100, 100);
		this.setInteractive();
		this.oScene.input.setDraggable(this);
		this.lastPosX = this.x;
		this.lastPosY = this.y;
		const self = this;
		this.lastRowAndCol = null

		this.on("pointerdown", () => { this.setScale(0.75); }, self);

		this.oScene.input.on("drag", function (pointer, gameObj, dragX, dragY) {
			if (gameObj === self) {
				gameObj.x = dragX;
				gameObj.y = dragY;
				gameObj.setScale(0.75);
				self.matchImage(gameObj);
			}
		}, this);

		this.oScene.input.on("dragend", function (pointer, gameObj) {
			if (gameObj === self) {
				if (this.lastRowAndCol !== null) {
					this.setFinalbombblast()
				} else {
					this.setAlphavalues(1);
				}
				this.setScale(0.35);
				gameObj.x = this.lastPosX;
				gameObj.y = this.lastPosY;

			}
		}, this);

	}
	matchImage(gameObj) {
		const minDistance = 40;
		let nearestDeck = null;
		let deckNumber = null;

		for (const x in this.oScene.AllImageArray) {
			const disFromOpenDeck = Phaser.Math.Distance.BetweenPoints(gameObj, this.oScene.AllImageArray[x]);
			if (Math.round(disFromOpenDeck) < minDistance) {
				nearestDeck = this.oScene.AllImageArray[x];
				deckNumber = x;
				break;
			} else {

			}
		}
		if (nearestDeck !== null && nearestDeck.texture.key !== "Bitmap") {
			this.sethighlitbox(parseInt(nearestDeck.name.split("")[2]), parseInt(nearestDeck.name.split("")[0]), nearestDeck.texture.key)
			gameObj.x = nearestDeck.x;
			gameObj.y = nearestDeck.y;
		}
		if (nearestDeck !== null && nearestDeck.texture.key === "Bitmap") {
			this.setAlphavalues(1);
			this.lastRowAndCol = null
		}

	}
	sethighlitbox(col, row, color) {
		this.lastRowAndCol = { "Row": row, "Col": col, "Color": color }
		this.setAlphavalues(0.35);

		for (let index_col = 0; index_col < 8; index_col++) {
			for (let index_row = 0; index_row < 8; index_row++) {
				if (color === this.oScene.AllImageObj[index_col][index_row].sprite.texture.key)
					this.oScene.AllImageObj[index_col][index_row].sprite.alpha = 1;
			}
		}
	}
	setFinalbombblast() {
		const col = this.lastRowAndCol.Col;
		const row = this.lastRowAndCol.Row;
		const color = this.lastRowAndCol.Color;

		const gem = this.oScene.add.sprite(this.oScene.AllImageObj[row][col].sprite.x, this.oScene.AllImageObj[row][col].sprite.y, "Bitmap")

		gem.play('bom_anim').setScale(1.5);

		for (let index_col = 0; index_col < 8; index_col++) {
			for (let index_row = 0; index_row < 8; index_row++) {
				if (color === this.oScene.AllImageObj[index_col][index_row].sprite.texture.key)
					this.oScene.AllImageObj[index_col][index_row].sprite.setTexture("Bitmap");
				this.oScene.removeArray[index_row][index_col] = 0;

			}
		}
		this.setAlphavalues(1);
		this.lastRowAndCol = null
	}


	setAlphavalues(alphaValue) {
		for (let index_col = 0; index_col < 8; index_col++) {
			for (let index_row = 0; index_row < 8; index_row++) {
				this.oScene.AllImageObj[index_col][index_row].sprite.alpha = alphaValue;
			}
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
