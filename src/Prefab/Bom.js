
// You can write more code here

/* START OF COMPILED CODE */

class Bom extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "bomb", frame);

		this.scaleX = 0.19;
		this.scaleY = 0.19;

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
		this.setSize(175, 175);
		this.setInteractive();
		this.oScene.input.setDraggable(this);
		this.lastPosX = this.x;
		this.lastPosY = this.y;
		const self = this;
		this.lastRowAndCol = null

 		this.on("pointerdown", () => { this.oScene.bIBomDrag ? this.setScale(0.35) : null }, self);

		this.oScene.input.on("drag", function (pointer, gameObj, dragX, dragY) {
			if (gameObj === self && this.oScene.bIBomDrag) {
				gameObj.x = dragX;
				gameObj.y = dragY;
				gameObj.setScale(0.35);
				self.matchImage(gameObj);
				this.oScene.isPaused = true

			}
		}, this);

		this.oScene.input.on("dragend", function (pointer, gameObj) {
			if (gameObj === self && this.oScene.bIBomDrag) {
				if (this.lastRowAndCol !== null) {
					this.setFinalbombblast();
					this.oScene.isPaused = false

				} else {
					this.setAlphavalues(1);
				}

				this.setScale(0.17);
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
				this.lastRowAndCol = null
 			}
		}
		if (nearestDeck !== null) {
			this.sethighlitbox(parseInt(nearestDeck.name.split("")[2]), parseInt(nearestDeck.name.split("")[0]))
			gameObj.x = nearestDeck.x;
			gameObj.y = nearestDeck.y;
		}  
	}
	sethighlitbox(col, row) {
		this.lastRowAndCol = { "Row": row, "Col": col }
		this.setAlphavalues(0.35);

		if (col >= 0 && col < 8 && row >= 0 && row < 8) {
			for (let i = row - 1; i <= row + 1; i++) {
				for (let j = col - 1; j <= col + 1; j++) {
					if (i >= 0 && i <= 7 && j >= 0 && j <= 7) {
						this.oScene.AllImageObj[i][j].sprite.alpha = 1;
					}
				}
			}
		}

	}
	setFinalbombblast() {
		const col = this.lastRowAndCol.Col;
		const row = this.lastRowAndCol.Row;

		if (col >= 0 && col < 8 && row >= 0 && row < 8) {
			const gem = this.oScene.add.sprite(this.oScene.AllImageObj[row][col].sprite.x, this.oScene.AllImageObj[row][col].sprite.y, "back-Box")

			gem.play('bom_anim').setScale(1.5)
			for (let i = row - 1; i <= row + 1; i++) {
				for (let j = col - 1; j <= col + 1; j++) {
					if (i >= 0 && i <= 7 && j >= 0 && j <= 7) {
						this.oScene.AllImageObj[i][j].sprite.setTexture("back-Box");
						this.oScene.removeArray[j][i] = 0;
					}
				}
			}
		}
		this.setAlphavalues(1);
		this.lastRowAndCol = null;
		this.oScene.bIBomDrag = false;
		this.oScene.btn_pls_bom.setTexture("btn_pls");
		this.oScene.setISCurruntPosible()


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
