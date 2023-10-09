
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

		// back_block_Cont
		const back_block_Cont = this.add.container(0, 0);

		// background_Box
		const background_Box = this.add.image(691, 363, "background-Box");
		background_Box.scaleX = 1.03;
		background_Box.scaleY = 1.03;
		back_block_Cont.add(background_Box);

		// side_cont
		const side_cont = this.add.container(0, 0);

		// back_bom
		const back_bom = this.add.image(121, 641, "hammer-box");
		back_bom.scaleX = 0.5;
		back_bom.scaleY = 0.5;
		side_cont.add(back_bom);

		// back_diamond
		const back_diamond = this.add.image(117, 535, "hammer-box");
		back_diamond.scaleX = 0.5;
		back_diamond.scaleY = 0.5;
		side_cont.add(back_diamond);

		// btn_pls_bom
		const btn_pls_bom = this.add.image(156, 608, "btn_pls");
		btn_pls_bom.scaleX = 1.5;
		btn_pls_bom.scaleY = 1.5;
		side_cont.add(btn_pls_bom);

		// btn_pls_diamond
		const btn_pls_diamond = this.add.image(153, 502, "btn_pls");
		btn_pls_diamond.scaleX = 1.5;
		btn_pls_diamond.scaleY = 1.5;
		side_cont.add(btn_pls_diamond);

		// container_side_block
		const container_side_block = this.add.container(0, 0);

		// side_box
		const side_box = this.add.image(1170.800048828125, 360, "side-box");
		side_box.scaleX = 0.6;
		side_box.scaleY = 0.6;
		container_side_block.add(side_box);

		// container_star
		const container_star = this.add.container(0, 0);

		// outerBar
		const outerBar = this.add.image(165, 283, "outerBar");
		container_star.add(outerBar);

		// innerBar
		const innerBar = this.add.image(29, 283, "innerBar");
		innerBar.scaleX = 0;
		innerBar.setOrigin(0, 0.5);
		container_star.add(innerBar);

		// stars
		const stars = this.add.image(54, 281, "star");
		container_star.add(stars);

		// text_star
		const text_star = this.add.text(174, 211, "", {});
		text_star.setOrigin(0.5, 0.5);
		text_star.text = "0";
		text_star.setStyle({ "fontFamily": "Allerta", "fontSize": "50px" });
		container_star.add(text_star);

		// text_leval
		const text_leval = this.add.text(168, 117, "", {});
		text_leval.setOrigin(0.5, 0.5);
		text_leval.text = "Level : 1";
		text_leval.setStyle({ "fontFamily": "Allerta", "fontSize": "50px" });
		container_star.add(text_leval);

		// container_by_bom
		const container_by_bom = this.add.container(0, 0);
		container_by_bom.visible = false;

		// rectangle_2
		const rectangle_2 = this.add.rectangle(640, 360, 128, 128);
		rectangle_2.scaleX = 10.066541849013248;
		rectangle_2.scaleY = 5.807530997091754;
		rectangle_2.isFilled = true;
		rectangle_2.fillColor = 0;
		rectangle_2.fillAlpha = 0.8;
		container_by_bom.add(rectangle_2);

		// back_star
		const back_star = this.add.image(640, 360, "back-star");
		container_by_bom.add(back_star);

		// bom_btn
		const bom_btn = this.add.image(565, 359, "bomb");
		bom_btn.scaleX = 0.55;
		bom_btn.scaleY = 0.55;
		container_by_bom.add(bom_btn);

		// text_1
		const text_1 = this.add.text(633, 362, "", {});
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "10";
		text_1.setStyle({ "fontFamily": "Allerta", "fontSize": "40px" });
		container_by_bom.add(text_1);

		// stars_1
		const stars_1 = this.add.image(683, 359, "star");
		stars_1.scaleX = 0.5;
		stars_1.scaleY = 0.5;
		container_by_bom.add(stars_1);

		// bnt_lock_bom
		const bnt_lock_bom = this.add.image(771, 360, "bnt_lock");
		container_by_bom.add(bnt_lock_bom);

		// txt_Total_star
		const txt_Total_star = this.add.text(640, 169, "", {});
		txt_Total_star.setOrigin(0.5, 0.5);
		txt_Total_star.text = "0";
		txt_Total_star.setStyle({ "fontFamily": "Allerta", "fontSize": "50px" });
		container_by_bom.add(txt_Total_star);

		// btn_close
		const btn_close = this.add.image(1165, 84, "btn_pls");
		btn_close.scaleX = 2;
		btn_close.scaleY = 2;
		btn_close.angle = 45;
		container_by_bom.add(btn_close);

		// container_level_failed
		const container_level_failed = this.add.container(0, 0);
		container_level_failed.visible = false;

		// level_failed_popup
		const level_failed_popup = this.add.image(703, 266, "Level-failed-popup");
		level_failed_popup.scaleX = 0.8;
		level_failed_popup.scaleY = 0.8;
		container_level_failed.add(level_failed_popup);

		// failed_score_txt
		const failed_score_txt = this.add.text(699, 444, "", {});
		failed_score_txt.setOrigin(0.5, 0.5);
		failed_score_txt.text = "SCORE : 50";
		failed_score_txt.setStyle({ "fontFamily": "Allerta", "fontSize": "40px" });
		container_level_failed.add(failed_score_txt);

		// failed_level_txt
		const failed_level_txt = this.add.text(702, 246, "", {});
		failed_level_txt.setOrigin(0.5, 0.5);
		failed_level_txt.text = "Level: 01";
		failed_level_txt.setStyle({ "fontFamily": "Allerta", "fontSize": "30px" });
		container_level_failed.add(failed_level_txt);

		// replay_btn_failed
		const replay_btn_failed = this.add.image(697, 538, "replay-btn");
		container_level_failed.add(replay_btn_failed);

		// container_winner
		const container_winner = this.add.container(0, 0);
		container_winner.visible = false;

		// level_complete_popup
		const level_complete_popup = this.add.image(703, 266, "level-complete-popup");
		level_complete_popup.scaleX = 0.8;
		level_complete_popup.scaleY = 0.8;
		container_winner.add(level_complete_popup);

		// play_btn
		const play_btn = this.add.image(849, 530, "Play-btn");
		container_winner.add(play_btn);

		// replay_btn
		const replay_btn = this.add.image(556, 530, "replay-btn");
		container_winner.add(replay_btn);

		// home_btn
		const home_btn = this.add.image(702, 530, "Home-btn");
		container_winner.add(home_btn);

		// winning_score_txt
		const winning_score_txt = this.add.text(701, 445, "", {});
		winning_score_txt.setOrigin(0.5, 0.5);
		winning_score_txt.text = "SCORE : 50";
		winning_score_txt.setStyle({ "fontFamily": "Allerta", "fontSize": "40px" });
		container_winner.add(winning_score_txt);

		// winning_level_txt
		const winning_level_txt = this.add.text(701, 247, "", {});
		winning_level_txt.setOrigin(0.5, 0.5);
		winning_level_txt.text = "Level: 01";
		winning_level_txt.setStyle({ "fontFamily": "Allerta", "fontSize": "30px" });
		container_winner.add(winning_level_txt);

		// glowing_star_3
		const glowing_star_3 = this.add.image(804, 351, "Glowing-star");
		glowing_star_3.scaleX = 0.5;
		glowing_star_3.scaleY = 0.5;
		container_winner.add(glowing_star_3);

		// glowing_star_2
		const glowing_star_2 = this.add.image(699, 333, "Glowing-star");
		glowing_star_2.scaleX = 0.72;
		glowing_star_2.scaleY = 0.72;
		container_winner.add(glowing_star_2);

		// glowing_star_1
		const glowing_star_1 = this.add.image(594, 351, "Glowing-star");
		glowing_star_1.scaleX = 0.5;
		glowing_star_1.scaleY = 0.5;
		container_winner.add(glowing_star_1);

		this.back_block_Cont = back_block_Cont;
		this.btn_pls_bom = btn_pls_bom;
		this.btn_pls_diamond = btn_pls_diamond;
		this.side_cont = side_cont;
		this.container_side_block = container_side_block;
		this.innerBar = innerBar;
		this.stars = stars;
		this.text_star = text_star;
		this.text_leval = text_leval;
		this.container_star = container_star;
		this.bom_btn = bom_btn;
		this.bnt_lock_bom = bnt_lock_bom;
		this.txt_Total_star = txt_Total_star;
		this.btn_close = btn_close;
		this.container_by_bom = container_by_bom;
		this.failed_score_txt = failed_score_txt;
		this.failed_level_txt = failed_level_txt;
		this.replay_btn_failed = replay_btn_failed;
		this.container_level_failed = container_level_failed;
		this.play_btn = play_btn;
		this.replay_btn = replay_btn;
		this.home_btn = home_btn;
		this.winning_score_txt = winning_score_txt;
		this.winning_level_txt = winning_level_txt;
		this.container_winner = container_winner;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Container} */
	back_block_Cont;
	/** @type {Phaser.GameObjects.Image} */
	btn_pls_bom;
	/** @type {Phaser.GameObjects.Image} */
	btn_pls_diamond;
	/** @type {Phaser.GameObjects.Container} */
	side_cont;
	/** @type {Phaser.GameObjects.Container} */
	container_side_block;
	/** @type {Phaser.GameObjects.Image} */
	innerBar;
	/** @type {Phaser.GameObjects.Image} */
	stars;
	/** @type {Phaser.GameObjects.Text} */
	text_star;
	/** @type {Phaser.GameObjects.Text} */
	text_leval;
	/** @type {Phaser.GameObjects.Container} */
	container_star;
	/** @type {Phaser.GameObjects.Image} */
	bom_btn;
	/** @type {Phaser.GameObjects.Image} */
	bnt_lock_bom;
	/** @type {Phaser.GameObjects.Text} */
	txt_Total_star;
	/** @type {Phaser.GameObjects.Image} */
	btn_close;
	/** @type {Phaser.GameObjects.Container} */
	container_by_bom;
	/** @type {Phaser.GameObjects.Text} */
	failed_score_txt;
	/** @type {Phaser.GameObjects.Text} */
	failed_level_txt;
	/** @type {Phaser.GameObjects.Image} */
	replay_btn_failed;
	/** @type {Phaser.GameObjects.Container} */
	container_level_failed;
	/** @type {Phaser.GameObjects.Image} */
	play_btn;
	/** @type {Phaser.GameObjects.Image} */
	replay_btn;
	/** @type {Phaser.GameObjects.Image} */
	home_btn;
	/** @type {Phaser.GameObjects.Text} */
	winning_score_txt;
	/** @type {Phaser.GameObjects.Text} */
	winning_level_txt;
	/** @type {Phaser.GameObjects.Container} */
	container_winner;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();
		this.oLevalData =
			[{ nMaxScore: 20 },
			{ nMaxScore: 21 },
			{ nMaxScore: 22 },
			{ nMaxScore: 40 },
			{ nMaxScore: 50 },
			{ nMaxScore: 60 },
			{ nMaxScore: 70 },
			{ nMaxScore: 80 },
			{ nMaxScore: 95 },
			{ nMaxScore: 100 },
			]
		this.nCurruntLeval = Math.min(this.oLevalData.length-1, JSON.parse(localStorage.getItem("nCurruntLeval") == null ? 0 : localStorage.getItem("nCurruntLeval")));
		this.text_leval.setText(`Level : ${this.nCurruntLeval + 1}`);
		this.nCurruntLevalData = this.oLevalData[Math.min(this.oLevalData.length-1, this.nCurruntLeval)];

 		this.AllImageObj = [];
		this.AllImageArray = [];
		this.removeArray = [];
		this.allPrefab = [];
		this.nPrefab = 0;
		this.nTotalStar = 18;
		this.bIBomDrag = false
		this.bIDiamondDrag = false

		for (let index_x = 0; index_x < 8; index_x++) {
			this.AllImageObj[index_x] = [];
			for (let index_y = 0; index_y < 8; index_y++) {
				const img = this.add.sprite((428 + 75 * index_x), (100 + 75 * index_y), "back-Box");
				img.name = `${index_x}_${index_y}`;
				this.back_block_Cont.add(img)
				this.AllImageArray.push(img)
				this.AllImageObj[index_x].push({ sprite: img, isStar: false })
			}
		}

		this.block_1 = new Blocks(this, 1175, 150);
		this.block_2 = new Blocks(this, 1175, 350);
		this.block_3 = new Blocks(this, 1175, 550);
		this.block_1.setPosition(this.block_1.nPosition.x + this.block_1.x, this.block_1.nPosition.y + this.block_1.y)
		this.block_2.setPosition(this.block_2.nPosition.x + this.block_2.x, this.block_2.nPosition.y + this.block_2.y)
		this.block_3.setPosition(this.block_3.nPosition.x + this.block_3.x, this.block_3.nPosition.y + this.block_3.y)
		this.allPrefab.push(this.block_1, this.block_2, this.block_3);
		this.container_side_block.add([this.block_1, this.block_2, this.block_3])
		for (let i = 0; i < 8; i++) {
			this.removeArray[i] = []
			for (let j = 0; j < 8; j++) {
				this.removeArray[i].push(0);
			}
		}

		this.oUiManager = new UiManager(this);

		// Set interactive behavior for this.bnt_lock_bom
		this.bnt_lock_bom.setInteractive().on('pointerdown', () => {
			if (this.nTotalStar > 9) {
				this.container_by_bom.setVisible(false);
				if (this.bom_btn.texture.key === "bomb") {
					this.btn_pls_bom.setTexture("btn_right");
					this.bIBomDrag = true;
				} else {
					this.btn_pls_diamond.setTexture("btn_right");
					this.bIDiamondDrag = true;
				}
				this.nTotalStar -= 10;

			}
		});

		// Set interactive behavior for this.btn_pls_bom
		this.btn_pls_bom.setInteractive().on('pointerdown', () => {
			this.container_by_bom.setVisible(true);
			this.bom_btn.setTexture("bomb");
			this.txt_Total_star.setText(this.nTotalStar)
		});

		// Set interactive behavior for this.btn_pls_diamond
		this.btn_pls_diamond.setInteractive().on('pointerdown', () => {
			this.container_by_bom.setVisible(true);
			this.bom_btn.setTexture("Hammer");
			this.txt_Total_star.setText(this.nTotalStar)
		});
		this.btn_close.setInteractive().on('pointerdown', () => {
			this.container_by_bom.setVisible(false);
		});

		this.replay_btn.setInteractive().on('pointerdown', () => {
			this.scene.restart();
		})
		this.home_btn.setInteractive().on('pointerdown', () => {
			this.scene.start("Preload");
		})
		this.play_btn.setInteractive().on('pointerdown', () => {
			this.scene.restart();
			localStorage.setItem("nCurruntLeval", this.nCurruntLeval += 1);

		})

		this.replay_btn_failed.setInteractive().on('pointerdown', () => {
			this.scene.restart();
		});

		if (window.innerWidth <= 820) {
			// this.openFullscreen();
			this.back_block_Cont.setScale(0.5);
			this.back_block_Cont.setPosition(-165, 150);
			this.side_cont.setScale(0.5);
			this.container_star.setScale(0.5);
			this.container_side_block.setScale(0.5);
			// this.container_side_block.x -=500;
			// this.container_side_block.setAngle(-90)

		}


	}
	addNewPrefab(imgName) {
		this.nPrefab++;
		if (this.nPrefab % 3 == 0) {
			this.allPrefab = [];
			this.block_1 = new Blocks(this, 1175, 150);
			this.block_2 = new Blocks(this, 1175, 350);
			this.block_3 = new Blocks(this, 1175, 550);
			this.block_1.setPosition(this.block_1.nPosition.x + this.block_1.x, this.block_1.nPosition.y + this.block_1.y)
			this.block_2.setPosition(this.block_2.nPosition.x + this.block_2.x, this.block_2.nPosition.y + this.block_2.y)
			this.block_3.setPosition(this.block_3.nPosition.x + this.block_3.x, this.block_3.nPosition.y + this.block_3.y)
			this.allPrefab.push(this.block_1, this.block_2, this.block_3);
			this.container_side_block.add([this.block_1, this.block_2, this.block_3])

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
			} else {
				this.allPrefab[index_prefab].alpha = 1;
			}

		}

		if (aNotPosibleBlock.length > 0) {
			if (aNotPosibleBlock.length === this.allPrefab.length) {
				console.log("**************************************");
				setTimeout(() => {
					this.oUiManager.setNotWinnerAnimation();
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



	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
