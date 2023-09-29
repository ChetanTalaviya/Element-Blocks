
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// field_cover
		const field_cover = this.add.image(649, 365, "field-cover");
		field_cover.scaleX = 1.05;
		field_cover.scaleY = 1.05;

		// back_block_Cont
		const back_block_Cont = this.add.container(0, 0);

		// side_cont
		const side_cont = this.add.container(0, 0);

		// back_bom
		const back_bom = this.add.image(121, 641, "back");
		back_bom.scaleX = 0.35;
		back_bom.scaleY = 0.35;
		side_cont.add(back_bom);

		// back_diamond
		const back_diamond = this.add.image(117, 535, "back");
		back_diamond.scaleX = 0.35;
		back_diamond.scaleY = 0.35;
		side_cont.add(back_diamond);

		this.back_block_Cont = back_block_Cont;
		this.side_cont = side_cont;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Container} */
	back_block_Cont;
	/** @type {Phaser.GameObjects.Container} */
	side_cont;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();

		this.AllImageObj = [];
		this.AllImageArray = [];
		this.removeArray = [];

		this.allPrefab = [];

		this.nPrefab = 0


		for (let index_x = 0; index_x < 8; index_x++) {
			this.AllImageObj[index_x] = [];
			for (let index_y = 0; index_y < 8; index_y++) {
				const img = this.add.sprite(375 + 76 * index_x, 100 + 76 * index_y, "Bitmap");
				img.name = `${index_x}_${index_y}`;
				this.back_block_Cont.add(img)
				this.AllImageArray.push(img)
				this.AllImageObj[index_x].push({sprite:img ,isStar:false})
			}
		}

		this.block_1 = new Blocks(this, 1100, 150);
		this.block_2 = new Blocks(this, 1100, 350);
		this.block_3 = new Blocks(this, 1100, 550);
		this.allPrefab.push(this.block_1, this.block_2, this.block_3)
		for (let i = 0; i < 8; i++) {
			this.removeArray[i] = []
			for (let j = 0; j < 8; j++) {
				this.removeArray[i].push(0);
			}
		}

		this.oUiManager = new UiManager(this);
		this.addPartical()
	}
	addNewPrefab(imgName) {
		this.nPrefab++;
		if (this.nPrefab % 3 == 0) {
			this.allPrefab = [];
			this.block_1 = new Blocks(this, 1100, 150);
			this.block_2 = new Blocks(this, 1100, 350);
			this.block_3 = new Blocks(this, 1100, 550);
			this.allPrefab.push(this.block_1, this.block_2, this.block_3)
		}
		this.allPrefab.map((x, index) => {
			x.name === imgName ? this.allPrefab.splice(index, 1) : null
		});
		this.allPrefab.length > 0 ? this.setISCurruntPosible() : null
	}

	setISCurruntPosible() {

		let isPossible = true;
		const aNotPosibleBlock = [];

		for (let index_prefab = 0; index_prefab < this.allPrefab.length; index_prefab++) {

			const newCol = this.allPrefab[index_prefab].name.y;
			const newRow = this.allPrefab[index_prefab].name.x;
			const newZ = this.allPrefab[index_prefab].name.z;
 			for (let index_col = 0; index_col < 8; index_col++) {
				for (let index_row = 0; index_row < 8; index_row++) {
					if (this.isAvailable(index_col, index_row, newCol, newRow, newZ === 1)) {
						isPossible = false;
						break;
					}
				}

				if (!isPossible) {
					break;
				}
			}
			if (isPossible) {
				console.log("Not_Posible", this.allPrefab[index_prefab].name);
				this.allPrefab[index_prefab].alpha = 0.7;
				aNotPosibleBlock.push(this.allPrefab[index_prefab]);
			}

		}

		if (aNotPosibleBlock.length > 0) {
			if (aNotPosibleBlock.length === this.allPrefab.length) {
				console.log("**************************************");
				setTimeout(() => {
					this.oUiManager.setWinnwrAnimation();
				}, 1000);



			}
			console.log(aNotPosibleBlock);
		}


	}
	isAvailable(col, row, newCol, newRow, isnewZ) {
		let result_row = 0;
		let result_col = 0;
		if (newCol === 0 && newRow === 0) { return true }

		if (newRow > 0 && newCol > 0) {

			if (isnewZ) {
				for (let index_row = 0; index_row <= newRow; index_row++) {
					if (row + index_row < 8 && col + 1 < 8 && this.removeArray[col][row + index_row] === 0 && this.removeArray[col + 1][row] === 0 && this.removeArray[col + 1][row + 1] === 0) {
						result_row++;
					}
				}
 				// Check columns
				for (let index_col = 0; index_col <= newCol; index_col++) {
					if (col + index_col < 8 && this.removeArray[col + index_col][row] === 0) {
						result_col++;
					}
				}
			} else {
				// Check rows
				for (let index_row = 0; index_row <= newRow; index_row++) {
					if (row + index_row < 8 && this.removeArray[col][row + index_row] === 0) {
						result_row++;
					}
				}
				// Check columns
				for (let index_col = 0; index_col <= newCol; index_col++) {
					if (col + index_col < 8 && this.removeArray[col + index_col][row] === 0) {
						result_col++;
					}
				}
			}

		} else if (newRow < 0 && newCol < 0) {
			// Check rows
			for (let index_row = 0; index_row <= Math.abs(newRow); index_row++) {
				if (row - index_row >= 0 && this.removeArray[col][row - index_row] === 0) {
					result_row++;
				}
			}
			// Check columns
			for (let index_col = 0; index_col <= Math.abs(newCol); index_col++) {
				if (col - index_col >= 0 && this.removeArray[col - index_col][row] === 0) {
					result_col++;
				}
			}
		} else {
			if (newCol > 0) {
				for (let index_col = 0; index_col <= newCol; index_col++) {
					if (col + index_col < 8 && this.removeArray[col + index_col][row] === 0) {
						result_col++;
					}
				}
			}
			if (newCol < 0) {
				for (let index_col = 0; index_col <= Math.abs(newCol); index_col++) {
					if (col >= Math.abs(newCol) && this.removeArray[col - index_col][row] === 0) {
						result_col++;
					}
				}
			}

			if (newRow > 0) {
				for (let index_row = 0; index_row <= newRow; index_row++) {
					if (row + index_row < 8 && this.removeArray[col][row + index_row] === 0) {
						result_row++;
					}
				}
			}

			if (newRow < 0) {
				for (let index_row = 0; index_row <= Math.abs(newRow); index_row++) {
					if (row >= Math.abs(newRow) && this.removeArray[col][row - index_row] === 0) {
						result_row++;
					}
				}
			}
			if (newCol !== 0 && newRow !== 0) {
				return result_col === Math.abs(newCol) + 1 && result_row === Math.abs(newRow) + 1;

			}

			return newCol !== 0 ? result_col === (Math.abs(newCol) + 1) : newRow !== 0 ? result_row === (Math.abs(newRow) + 1) : false
		}
		return result_col === Math.abs(newCol) + 1 && result_row === Math.abs(newRow) + 1;


	}
	addPartical() {

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
