class UiManager {
    constructor(oSceneObj) {
        this.oSceneObj = oSceneObj;
        const self = this;

        this.oHammer = new Hammer(this.oSceneObj, 117, 536);
        this.bom = new Bom(this.oSceneObj, 120, 642);

        this.oSceneObj.side_cont.add(this.bom)
        this.oSceneObj.side_cont.add(this.oHammer)

    }

    setNotWinnerAnimation() {

        this.oSceneObj.container_level_failed.setVisible(true)
        this.oSceneObj.failed_score_txt.text = `SCORE : ${this.oSceneObj.nTotalStar}`
        this.oSceneObj.failed_level_txt.text = `LEVEL : ${this.oSceneObj.nCurruntLeval + 1}`
    }
    setScoreProgressBar(col, row) {
        this.oSceneObj.nTotalStar += 1;
        this.oSceneObj.AllImageObj[row][col].isStar = false;
        let nTempx = this.oSceneObj.AllImageObj[row][col].sprite.x;
        let nTempy = this.oSceneObj.AllImageObj[row][col].sprite.y;
        let star = this.oSceneObj.add.image(nTempx, nTempy, "star").setScale(0.4);
        const emitter = this.oSceneObj.add.particles(nTempx, nTempy, "star", {
            scale: { min: 0.015, max: 0.015 },
            speed: { min: 50, max: 150 },
            lifespan: 500,
            maxParticles: 100,
        });

        this.oSceneObj.tweens.add({
            targets: [star, emitter],
            duration: 400,
            rotation: -1,
            x: { start: nTempx, to: nTempx + 50 },
            y: nTempy + 20,
            onComplete: () => {
                this.oSceneObj.tweens.add({
                    targets: [star, emitter],
                    x: { start: nTempx + 50, to: this.oSceneObj.stars_img.x },
                    y: { start: nTempy + 20, to: this.oSceneObj.stars_img.y },
                    ease: 'Linear',
                    duration: 600,
                    rotation: -5,
                    onComplete: () => {
                        star.setVisible(false);
                        this.oSceneObj.text_star.text = this.oSceneObj.nTotalStar;
                        setTimeout(() => emitter.stop(), 200);
                        this.setProgressBar(this.oSceneObj.nTotalStar)

                    }
                });
            }
        });
    }
    setProgressBar(score) {
        const nscale = score / this.oSceneObj.nCurruntLevalData.nMaxScore;
        this.oSceneObj.innerBar.scaleX = Math.min(1, nscale);
        if (nscale >= 1) {
            setTimeout(() => {
                this.oSceneObj.container_winner.setVisible(true);
                this.oSceneObj.winning_score_txt.text = `SCORE : ${this.oSceneObj.nTotalStar}`
                this.oSceneObj.winning_level_txt.text = `LEVEL : ${this.oSceneObj.nCurruntLeval + 1}`
                this.starAnimation();


            }, 700);
        }

    }
    setRotationAnimation(img) {
        this.oSceneObj.tweens.add({
            targets: img,
            ease: 'Linear',
            rotation: 80,
            duration: 100000,
            repeat: -1,
        });
    }

    setNotWinnerPartical() {
        const emitters = this.oSceneObj.add.particles(643, 230, "sugar crusdfth-57", {
            rotate: { min: -30, max: 30 },
            scale: { start: 0.7, end: 0 },
            positionX: { min: -10, max: 10 },
            speed: 100,
            lifespan: 5000,
            frequency: 500,
            gravityY: -100,

        });
        setTimeout(() => {
            emitters.stop();
        }, 1000);
    }


    starAnimation() {
        let nDelay = 0;
        for (let i = 1; i <= 3; i++) {
            const star = this.oSceneObj.container_stars.list[i - 1]
            this.oSceneObj.container_stars.list[0].setVisible(true);
            star.setScale(3, 3);
            this.oSceneObj.tweens.add({
                targets: star,
                scaleX: i == 2 ? 0.83 : 0.5,
                scaleY: i == 2 ? 0.83 : 0.5,
                duration: 400,
                delay: nDelay,
                onComplete: () => {
                    if (i < 3) this.oSceneObj.container_stars.list[i].setVisible(true);
                }
            })
            nDelay += 400;
        }
    }
}