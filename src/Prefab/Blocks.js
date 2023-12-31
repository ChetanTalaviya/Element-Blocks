// You can write more code here

/* START OF COMPILED CODE */

class Blocks extends Phaser.GameObjects.Container {
	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// blocks_cont
		const blocks_cont = scene.add.container(0, 0);
		this.add(blocks_cont);

		this.blocks_cont = blocks_cont;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.oScene = scene;
		this.oScene.add.existing(this);
		this.response();
		this.addNewBlocks();
		this.on('pointerover', () => this.setScale(1.1));
		this.on('pointerout', () => this.setScale(1));



		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Container} */
	blocks_cont;

	/* START-USER-CODE */

	// Write your code here.
	addNewBlocks() {

		this.isDragged = true;
		// this.setSize(
		// 	80 * Math.abs(this.name.x) + 80,
		// 	(80 * Math.abs(this.name.y) + 80)
		// );
		this.setSize(180, 180)

		this.setInteractive();
		this.oScene.input.setDraggable(this);
		var self = this;

		this.lastPosX = this.x + this.nPosition.x;
		this.lastPosY = this.y + this.nPosition.y;
		this.isLastXY = null;
		this.aMatchingBox = [];
		this.aFinalMatchingImage = [];
		this.aTempMtachImage = [];

		this.on(
			"pointerdown",
			() => {
				!this.oScene.isWinner ? this.setScale(1.4) : null
			},
			self
		); 
 		this.oScene.input.on(
			"drag",
			function (pointer, gameObj, dragX, dragY) {
				if (gameObj === self && self.isDragged && !this.oScene.isWinner) {
					gameObj.x = dragX;
					gameObj.y = dragY;
					gameObj.setScale(1.4);
					for (const x in self.oScene.AllImageArray) {
						let disFromOpenDeck = Phaser.Math.Distance.BetweenPoints(
							gameObj,
							self.oScene.AllImageArray[x]
						);
						if (
							Math.round(disFromOpenDeck) < 40 &&
							self.checkIsAvailable(
								parseInt(self.oScene.AllImageArray[x].name.split("")[2]),
								parseInt(self.oScene.AllImageArray[x].name.split("")[0]),
								x,
								gameObj.name
							)
						) {
							disFromOpenDeck = 40;
							break;
						} else {
							if (this.isLastXY !== null) {
								this.aMatchingBox.map((x) => {
									x.destroy();
								});
							}
							if (this.aTempMtachImage.length > 0) {
								this.aTempMtachImage.forEach((box) => {
									box.destroy();
								});
							}
						}
					}
				}
			},
			this
		);

		this.oScene.input.on(
			"dragend",
			function (pointer, gameObj) {
				if (gameObj === self) {
					self.matchImage(gameObj);
					// this.depth = 0;
				}
			},
			this
		);
	}

	matchImage(gameObj) {
		const minDistance = 40;
		let nearestDeck = null;
		let deckNumber = null;

		for (const x in this.oScene.AllImageArray) {
			const disFromOpenDeck = Phaser.Math.Distance.BetweenPoints(
				gameObj,
				this.oScene.AllImageArray[x]
			);
			if (
				Math.round(disFromOpenDeck) < minDistance &&
				this.checkIsAvailable(
					parseInt(this.oScene.AllImageArray[x].name.split("")[2]),
					parseInt(this.oScene.AllImageArray[x].name.split("")[0]),
					x,
					gameObj.name
				)
			) {
				nearestDeck = this.oScene.AllImageArray[x];
				deckNumber = x;
				break;
			} else {
				if (this.isLastXY !== null) {
					this.aMatchingBox.map((x) => {
						x.destroy();
					});
				}
				if (this.aTempMtachImage.length > 0) {
					this.aTempMtachImage.forEach((box) => {
						box.destroy();
					});
				}
			}
		}
		if (nearestDeck !== null) {
			gameObj.x = nearestDeck.x;
			gameObj.y = nearestDeck.y;
			this.isDragged = false;
			this.lastPosX = this.x;
			this.lastPosY = this.y;
			gameObj.visible = false;
			if (this.isLastXY !== null) {
				this.aMatchingBox.map((x) => {
					x.destroy();
				});
			}
			if (this.aTempMtachImage.length > 0) {
				this.aTempMtachImage.forEach((box) => {
					box.destroy();
				});
			}
			this.destroyImage(this.aFinalMatchingImage);
			this.oScene.addNewPrefab(this.name);
		} else {
			this.x = this.lastPosX;
			this.y = this.lastPosY;
			if (this.isLastXY !== null) {
				this.aMatchingBox.map((x) => {
					x.destroy();
				});
			}
			if (this.aTempMtachImage.length > 0) {
				this.aTempMtachImage.forEach((box) => {
					box.destroy();
				});
			}
			gameObj.setScale(1);
		}
	}

	checkIsAvailable(col, row, aXvalues, gameObj) {
		const newcol = parseInt(gameObj.y);
		const newrow = parseInt(gameObj.x);
		const newrow_Z = gameObj.z ? parseInt(gameObj.z) : 0;
		if (row >= 0 && row <= 7 && col >= 0 && col <= 7) {
			return this.sethighlitbox(col, row, aXvalues, newcol, newrow, newrow_Z);
		}
	}

	sethighlitbox(col, row, aXvalues, newcol, newrow, newrow_Z) {
		if (this.isLastXY !== null) {
			this.aMatchingBox.forEach((box) => {
				box.destroy();
			});
			this.aFinalMatchingImage = [];
		}

		if (newcol === 0 && newrow === 0 && this.isEmpty(col, row, newrow, 4)) {
			this.createMaskImage(
				this.oScene.AllImageArray[aXvalues].x,
				this.oScene.AllImageArray[aXvalues].y
			);
			this.ismatchingBox(col, row, newcol, newrow);
			this.aFinalMatchingImage[this.aFinalMatchingImage.length] = {
				col: col,
				row: row,
				img: this,
			};

			return true;
		}
		if (newrow > 0) {
			if (
				row <= 7 - newrow &&
				col <= 7 - newcol &&
				(newrow < 0 || newcol < 0 ? col >= Math.abs(newcol) : true) &&
				this.isEmpty(col, row, newrow, 0, newcol, newrow_Z)
			) {
				let xxY = 0;

				for (let row_index = 0; row_index <= newrow; row_index++) {
					console.log();
					const img = this.createMaskImage(
						this.oScene.AllImageArray[aXvalues].x + xxY,
						this.oScene.AllImageArray[aXvalues].y
					);

					xxY += 74;
					if (row_index > 0 || Math.abs(newcol) === 0) {
						this.aFinalMatchingImage[this.aFinalMatchingImage.length] = {
							col: col,
							row: row + row_index,
							img: this,
						};
					}
					this.ismatchingBox(col, row + row_index, newcol, newrow);
				}
				if (newrow_Z !== 0) {
					const img = this.createMaskImage(
						this.oScene.AllImageArray[aXvalues].x + 74,
						this.oScene.AllImageArray[aXvalues].y + 74
					);
					this.aFinalMatchingImage[this.aFinalMatchingImage.length] = {
						col: col + 1,
						row: row + newrow,
						img: this,
					};
					this.ismatchingBox(col + 1, row + newrow, newcol, newrow);
				}
			}
		} else {
			if (
				Math.abs(newrow) > 0 &&
				row >= Math.abs(newrow) &&
				row <= 7 + Math.abs(newrow) &&
				col <= 7 - newcol &&
				(newrow < 0 && newcol < 0 ? col >= Math.abs(newcol) : true) &&
				this.isEmpty(col, row, newrow, 1, newcol, newrow_Z)
			) {
				let xxY = 0;
				for (let row_index = 0; row_index <= Math.abs(newrow); row_index++) {
					const img = this.createMaskImage(
						this.oScene.AllImageArray[aXvalues].x - xxY,
						this.oScene.AllImageArray[aXvalues].y
					);
					if (row_index > 0 || Math.abs(newcol) === 0) {
						this.aFinalMatchingImage[this.aFinalMatchingImage.length] = {
							col: col,
							row: row - row_index,
							img: this,
						};
					}
					this.ismatchingBox(col, row - row_index, newcol, newrow);

					xxY += 74;
				}
			}
		}

		if (newcol > 0) {
			if (
				col <= 7 - newcol &&
				row <= 7 - newrow &&
				(newrow < 0 ? row >= Math.abs(newrow) : true) &&
				(newrow < 0 && newcol < 0 ? row >= Math.abs(newrow) : true) &&
				this.isEmpty(col, row, newcol, 2, newrow, newrow_Z)
			) {
				let xxY = 0;
				for (let col_index = 0; col_index <= newcol; col_index++) {
					const img = this.createMaskImage(
						this.oScene.AllImageArray[aXvalues].x,
						this.oScene.AllImageArray[aXvalues].y + xxY
					);
					this.aFinalMatchingImage[this.aFinalMatchingImage.length] = {
						col: col + col_index,
						row: row,
						img: this,
					};
					this.ismatchingBox(col + col_index, row, newcol, newrow);

					xxY += 74;
				}
			}
		} else {
			if (
				Math.abs(newcol) > 0 &&
				col >= Math.abs(newcol) &&
				col <= 7 + Math.abs(newcol) &&
				row <= 7 - newrow &&
				(newrow < 0 && newcol < 0 ? row >= Math.abs(newrow) : true) &&
				this.isEmpty(col, row, newcol, 3, newrow, newrow_Z)
			) {
				let xxY = 0;
				for (let col_index = 0; col_index <= Math.abs(newcol); col_index++) {
					const img = this.createMaskImage(
						this.oScene.AllImageArray[aXvalues].x,
						this.oScene.AllImageArray[aXvalues].y - xxY
					);
					this.aFinalMatchingImage[this.aFinalMatchingImage.length] = {
						col: col - col_index,
						row: row,
						img: this,
					};
					this.ismatchingBox(col - col_index, row, newcol, newrow);

					xxY += 74;
				}
			}
		}
		return this.aFinalMatchingImage.length > 0;
	}
	ismatchingBox(row, col, newcol, newrow) {
		if (this.aTempMtachImage.length > 0) {
			this.aTempMtachImage.forEach((box) => {
				box.destroy();
			});
		}
		const addImage = (i, is) => {
			for (let k = 0; k <= 7; k++) {
				if (is === "col") {
					var img = this.oScene.add.image(
						this.oScene.AllImageObj[i][k].sprite.x,
						this.oScene.AllImageObj[i][k].sprite.y,
						// this.color
						this.oScene.AllImageObj[i][k].isStar ? this.selectSimilarStarImages(this.color) : this.color
						// this.oScene.AllImageObj[i][k].isStar ? this.oScene.AllImageObj[i][k].sprite.texture.key : this.color
					);

				} else {
					var img = this.oScene.add.image(
						this.oScene.AllImageObj[k][i].sprite.x,
						this.oScene.AllImageObj[k][i].sprite.y,
						// this.color
						this.oScene.AllImageObj[k][i].isStar ? this.selectSimilarStarImages(this.color) : this.color
						// this.oScene.AllImageObj[k][i].isStar ? this.oScene.AllImageObj[k][i].sprite.texture.key : this.color
					);

				}
				this.oScene.back_block_Cont.add(img);
				this.aTempMtachImage.push(img);
			}
		};

		for (let i = 0; i <= 7; i++) {
			let rowSum = 0;
			let colSum = 0;

			for (let j = 0; j <= 7; j++) {
				rowSum += this.oScene.removeArray[i][j] === 1;
				colSum += this.oScene.removeArray[j][i] === 1;
			}
			if (newrow === 0 && newcol === 0) {
				if (rowSum === 7 && row === i) {
					addImage(i, "row");
				}
				if (colSum === 7 && col === i) {
					addImage(i, "col");
				}
			}
			if (newcol === 0) {
				if (rowSum + Math.abs(newrow) === 7 && row === i) {
					addImage(i, "row");
				}
				if (newrow < 0) {
					if (
						colSum === 7 &&
						(col === i ||
							col - newrow === i ||
							(newrow == -2 ? col - (newrow + 1) === i : null))
					) {
						addImage(i, "col");
					}
				} else {
					if (
						colSum === 7 &&
						(col === i ||
							col - newrow === i ||
							(newrow == 2 ? col - (newrow - 1) === i : null))
					) {
						addImage(i, "col");
					}
				}
			}
			if (newrow === 0) {
				if (colSum + Math.abs(newcol) === 7 && col === i) {
					addImage(i, "col");
				}
				if (newcol < 0) {
					if (
						rowSum === 7 &&
						(row === i ||
							row - newcol === i ||
							(newcol == -2 ? row - (newcol + 1) === i : null))
					) {
						addImage(i, "row");
					}
				} else {
					if (
						rowSum === 7 &&
						(row === i ||
							row - newcol === i ||
							(newcol == 2 ? row - (newcol - 1) === i : null) ||
							(newcol == 3
								? row - (newcol - 1) === i || row - (newcol - 2) === i
								: null))
					) {
						addImage(i, "row");
					}
				}
			}
			if (newrow !== 0 && newcol !== 0) {
				if (newrow > 0) {
					// if (rowSum + Math.abs(newrow) === 7 && row - Math.abs(newrow) === i) {
					// 	addImage(i, "row");
					// }
					// else if ((rowSum + 1 === 8) && ( Math.abs(newrow) === 2 ? (row - 1 === i || row === i) : true)) {
					// 	addImage(i, "row");

					// }
				}
				//    else {
				// 	if ((rowSum + Math.abs(newrow) === 7) && row + Math.abs(newrow) === i) {
				// 		addImage(i, "row");
				// 	}
				// 	//  else if ((rowSum + 1 === 8) && ( Math.abs(newrow) === 2 ? (row + 1 === i || row === i) : true)) {
				// 	// 	addImage(i, "row");

				// 	// }
				// }
				// if (newcol > 0) {
				// 	if (colSum + Math.abs(newcol) === 7 && col === i) {
				// 		addImage(i, "col");
				// 	}
				// }
				// else {
				// 	if (colSum + Math.abs(newcol) === 7 && col === i) {
				// 		addImage(i, "col");
				// 	}
				// }
			}
		}
	}
	selectSimilarStarImages(img) {
 		let iSimilarImg = null;
		switch (img) {
			case "block-Blue":
				iSimilarImg = "s-blue";
				break;
			case "block-green":
				iSimilarImg = "s-green";
				break;
			case "block-pink":
				iSimilarImg = "s-pink";
				break;
			case "block-purple":
				iSimilarImg = "s-purple";
				break;
			case "block-Red":
				iSimilarImg = "s-red";
				break;
			case "block-yellow":
				iSimilarImg = "s-yellow";
				break;
			default:
				// Handle cases not covered above, if needed
				break;
		}

 		return iSimilarImg;
	}


	response() {
		const i = Math.floor(Math.random() * 13); // Generate a random number between 0 and 11
		// const i = 12;
		this.allImage = [];
		const dis_X = 45;
		const dis_Y = 45;
		const aAllImage = ["block-Blue", "block-green", "block-pink", "block-purple", "block-Red", "block-yellow"];
		const aAllImagewithStar = ["s-blue", "s-green", "s-pink", "s-purple", "s-red", "s-yellow"];
		let randomImageLength = Math.floor(Math.random() * aAllImage.length)
		const randomImage = aAllImage[randomImageLength];
		const randomImagewithStar = aAllImagewithStar[randomImageLength];
		this.nPosition = { x: 0, y: 0 }
		const addImage = (x, y, imgs) => {
			const img = this.oScene.add.image(x, y, imgs);
			this.allImage.push({ img: img, color: imgs });
			this.blocks_cont.add(img);
			img.setScale(0.6);
			this.color = imgs;
			if (["s-blue", "s-green", "s-pink", "s-purple", "s-red", "s-yellow"].includes(imgs)) {
				this.isStarImage = { isStar: true, img: imgs };
			} else {
				this.isStarImage = { isStar: false };
			}
		};
		switch (i) {
			case 0:
				addImage(0, 0, randomImage);
				this.name = { x: 0, y: 0 };
				break;

			case 11:
				for (let index = 0; index <= 2; index++) {
					addImage(-index * dis_X, 0, randomImage);
				}
				this.name = { x: -2, y: 0 };
				this.nPosition = { x: 45, y: 0 }

				break;
			case 2:
				for (let index = 0; index <= 1; index++) {
					addImage(-index * dis_X, 0, randomImage);
				}
				this.name = { x: -1, y: 0 };
				this.nPosition = { x: 20, y: 0 }

				break;

			case 3:
				for (let index = 0; index <= 2; index++) {
					addImage(index * dis_X, 0, randomImage);
				}
				this.name = { x: 2, y: 0 };
				this.nPosition = { x: -50, y: 0 }
				break;
			case 4:
				for (let index = 0; index <= 3; index++) {
					addImage(0, index * dis_Y, randomImage);
				}
				this.name = { x: 0, y: 3 };
				this.nPosition = { x: 0, y: -57 }

				break;
			case 5:
				for (let index = 0; index <= 2; index++) {
					addImage(0, -index * dis_Y, randomImage);
				}
				this.name = { x: 0, y: -2 };
				this.nPosition = { x: 0, y: 50 }

				break;
			case 6:
				addImage(-dis_X, 0, randomImagewithStar);
				addImage(-dis_X * 2, 0, randomImage);
				for (let index = 0; index <= 2; index++) {
					addImage(0, index * dis_Y, randomImage);
				}
				this.name = { x: -2, y: 2 };
				this.nPosition = { x: 38, y: -20 }

				break;
			case 7:
				for (let index = 0; index <= 2; index++) {
					addImage(0, -index * dis_Y, randomImage);
				}
				addImage(dis_X, 0, randomImage);
				addImage(dis_X * 2, 0, randomImage);
				this.name = { x: 2, y: -2 };
				this.nPosition = { x: -45, y: 40 }

				break;
			case 8:
				for (let index = 0; index <= 2; index++) {
					addImage(0, -index * dis_Y, randomImage);
				}
				addImage(-dis_X, 0, randomImage);
				addImage(-dis_X * 2, 0, randomImage);
				this.name = { x: -2, y: -2 };
				this.nPosition = { x: 38, y: 40 }

				break;
			case 9:
				addImage(-dis_X, 0, randomImagewithStar);
				for (let index = 0; index <= 1; index++) {
					addImage(0, -index * dis_Y, randomImage);
				}
				this.name = { x: -1, y: -1 };
				this.nPosition = { x: 20, y: 20 }

				break;
			case 10:
				addImage(dis_X, 0, randomImagewithStar);
				for (let index = 0; index <= 1; index++) {
					addImage(0, index * dis_Y, randomImage);
				}
				this.name = { x: 1, y: 1 };
				this.nPosition = { x: -20, y: -20 }
				break;
			case 1:
				addImage(0, 0, randomImage);
				addImage(dis_X * 2, 0, randomImagewithStar);
				addImage(0, 45, randomImage);
				addImage(0, 90, randomImage);
				addImage(dis_X, 0, randomImage);
				this.name = { x: 2, y: 2 };
				this.nPosition = { x: -45, y: -20 }

				break;
			case 12:
				addImage(0, 0, randomImage);
				addImage(dis_X, dis_Y, randomImagewithStar);
				addImage(0, 45, randomImage);
				addImage(dis_X, 0, randomImage);
				this.name = { x: 1, y: 1, z: 1 };
				this.nPosition = { x: -20, y: -20 }

				break;
		}
	}
	isEmpty(col, row, aArray_1, i, aArray_2, newrow_Z) {
		return this.isHorizontalMatch(col, row, aArray_1, i, aArray_2, newrow_Z);
	}
	isHorizontalMatch(col, row, aArray_1, i, aArray_2, newrow_Z) {
		let result = -1;
		const array = Math.abs(aArray_1);
		for (let index_1 = 0; index_1 <= array; index_1++) {
			switch (i) {
				case 0:
					if (aArray_2 === 0) {
						if (this.oScene.removeArray[col][row + index_1] === 0) {
							result++;
						}
					} else {
						if (aArray_2 > 0) {
							if (newrow_Z !== 0) {
								if (
									this.oScene.removeArray[col][row + index_1] === 0 &&
									this.oScene.removeArray[col + 1][row + 1] === 0 &&
									this.oScene.removeArray[col + 1][row] === 0
								) {
									result++;
								}
							} else {
								if (
									this.oScene.removeArray[col][row + index_1] === 0 &&
									this.oScene.removeArray[col + 1][row] === 0 &&
									(aArray_2 === 2
										? this.oScene.removeArray[col + 2][row] === 0
										: true)
								) {
									result++;
								}
							}
						} else {
							if (
								this.oScene.removeArray[col][row + index_1] === 0 &&
								this.oScene.removeArray[col - 1][row] === 0 &&
								(aArray_2 === -2
									? this.oScene.removeArray[col - 2][row] === 0
									: true)
							) {
								result++;
							}
						}
					}
					break;
				case 1:
					if (aArray_2 === 0) {
						if (this.oScene.removeArray[col][row - index_1] === 0) {
							result++;
						}
					} else {
						if (aArray_2 < 0) {
							if (
								this.oScene.removeArray[col][row - index_1] === 0 &&
								this.oScene.removeArray[col - 1][row] === 0 &&
								(aArray_2 === -2
									? this.oScene.removeArray[col - 2][row] === 0
									: true)
							) {
								result++;
							}
						} else {
							if (
								this.oScene.removeArray[col][row - index_1] === 0 &&
								this.oScene.removeArray[col + 1][row] === 0 &&
								(aArray_2 === 2
									? this.oScene.removeArray[col + 2][row] === 0
									: true)
							) {
								result++;
							}
						}
					}
					break;
				case 2:
					if (aArray_2 === 0) {
						if (this.oScene.removeArray[col + index_1][row] === 0) {
							result++;
						}
					} else {
						if (aArray_2 > 0) {
							if (newrow_Z !== 0) {
								if (
									this.oScene.removeArray[col + index_1][row] === 0 &&
									this.oScene.removeArray[col + index_1][row + 1] === 0 &&
									this.oScene.removeArray[col + 1][row + 1] === 0
								) {
									result++;
								}
							} else {
								if (
									this.oScene.removeArray[col + index_1][row] === 0 &&
									this.oScene.removeArray[col][row + 1] === 0 &&
									(aArray_2 === 2
										? this.oScene.removeArray[col][row + 2] === 0
										: true)
								) {
									result++;
								}
							}
						} else {
							if (
								this.oScene.removeArray[col + index_1][row] === 0 &&
								this.oScene.removeArray[col][row - 1] === 0 &&
								(aArray_2 === -2
									? this.oScene.removeArray[col][row - 2] === 0
									: true)
							) {
								result++;
							}
						}
					}

					break;
				case 3:
					if (aArray_2 === 0) {
						if (this.oScene.removeArray[col - index_1][row] === 0) {
							result++;
						}
					} else {
						if (aArray_2 < 0) {
							if (
								this.oScene.removeArray[col - index_1][row] === 0 &&
								this.oScene.removeArray[col][row - 1] === 0 &&
								(aArray_2 === -2
									? this.oScene.removeArray[col][row - 2] === 0
									: true)
							) {
								result++;
							}
						} else {
							if (
								this.oScene.removeArray[col - index_1][row] === 0 &&
								this.oScene.removeArray[col][row + 1] === 0 &&
								(aArray_2 === 2
									? this.oScene.removeArray[col][row + 2] === 0
									: true)
							) {
								result++;
							}
						}
					}
					break;
				case 4:
					if (this.oScene.removeArray[col][row] === 0) {
						return true;
					}
					break;
			}
		}
		return result === array;
	}

	createMaskImage(x, y) {
		const img = this.oScene.add.image(x, y, this.color);
		this.oScene.back_block_Cont.add(img);
		img.setAlpha(0.5);
		this.aMatchingBox.push(img);
		this.isLastXY = img;
		return img;
	}
	destroyImage(aArray) {
		// console.log(aArray);
		for (let index = 0; index < aArray.length; index++) {
			this.oScene.removeArray[aArray[index].col][aArray[index].row] = 1;
			this.oScene.AllImageObj[aArray[index].row][
				aArray[index].col
			].sprite.setTexture(this.allImage[index].color);
			this.oScene.AllImageObj[aArray[index].row][aArray[index].col].isStar =
				["s-blue", "s-green", "s-pink", "s-purple", "s-red", "s-yellow"].includes(this.allImage[index].color) ? true : false;
		}
		if (this.matchInBoard().ismatch) {
			const nArray = this.matchInBoard().result;
			for (let result_Array = 0; result_Array < nArray.length; result_Array++) {
				let matchValue = nArray[result_Array];
				for (let index = 0; index <= 7; index++) {
					if (matchValue.Direction === "col") {
						this.oScene.removeArray[index][matchValue.DrconNmbr] = 0;
						this.oScene.AllImageObj[matchValue.DrconNmbr][
							index
						].sprite.setTexture("back-Box");
						this.matchAnimation(
							this.oScene.AllImageObj[matchValue.DrconNmbr][index].sprite.x,
							this.oScene.AllImageObj[matchValue.DrconNmbr][index].sprite.y
						);
						if (this.oScene.AllImageObj[matchValue.DrconNmbr][index].isStar) {
							this.oScene.oUiManager.setScoreProgressBar(index, matchValue.DrconNmbr);

						}
					} else {
						this.oScene.removeArray[matchValue.DrconNmbr][index] = 0;
						this.oScene.AllImageObj[index][
							matchValue.DrconNmbr
						].sprite.setTexture("back-Box");
						this.matchAnimation(
							this.oScene.AllImageObj[index][matchValue.DrconNmbr].sprite.x,
							this.oScene.AllImageObj[index][matchValue.DrconNmbr].sprite.y
						);
						if (this.oScene.AllImageObj[index][matchValue.DrconNmbr].isStar) {
							this.oScene.oUiManager.setScoreProgressBar(matchValue.DrconNmbr, index);


						}
					}
				}
			}
		}
	}

	matchInBoard() {
		const result = [];
		for (let i = 0; i <= 7; i++) {
			let result_row = 0;
			let result_col = 0;

			for (let j = 0; j <= 7; j++) {
				result_row += this.oScene.removeArray[i][j] === 1 ? 1 : 0;
				result_col += this.oScene.removeArray[j][i] === 1 ? 1 : 0;
			}

			if (result_col === 8) {
				result.push({ ismatch: true, Direction: "col", DrconNmbr: i });
			} else if (result_row === 8) {
				result.push({ ismatch: true, Direction: "row", DrconNmbr: i });
			}
		}

		return result.length > 0 ? { ismatch: true, result } : { ismatch: false };
	}
	matchAnimation(x, y) {
		const emitter = this.oScene.add.particles(x, y, this.color, {
			speed: { min: 100, max: 200 },
			scale: 0.3,
			lifespan: 200,
			frequency: 6,
			gravityY: 1000,
		});
		setTimeout(() => {
			emitter.stop();
		}, 100);

	}


}

/* END-USER-CODE */

/* END OF COMPILED CODE */

// You can write more code here
