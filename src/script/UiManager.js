class UiManager {
    constructor(oSceneObj) {
        this.oSceneObj = oSceneObj;
        const self = this;

        this.oHammer = new Hammer(this.oSceneObj,  117, 536);
         this.bom = new Bom(this.oSceneObj, 120, 642);

        this.oSceneObj.side_cont.add(this.bom)
        this.oSceneObj.side_cont.add(this.oHammer)

    }

    setNotWinnerAnimation() {
        // setTimeout(() => {
        //     for (let index_col = 0; index_col < 8; index_col++) {
        //         for (let index_row = 0; index_row < 8; index_row++) {
        //             this.oSceneObj.tweens.add({
        //                 targets: this.oSceneObj.AllImageObj[index_col][index_row],
        //                 props: {
        //                     x: { value: Math.floor(Math.random() * 1500), duration: 5000, },
        //                     y: { value: 1000, duration: 2000, },
        //                 },
        //                 ease: 'Sine.easeInOut',
        //             });
        //         }
        //     }
           
        // }, 1500);

        this.oSceneObj.container_level_failed.setVisible(true)
        this.oSceneObj.failed_score_txt.text = `SCORE : ${this.oSceneObj.nTotalStar}`
        this.oSceneObj.failed_level_txt.text = `LEVEL : ${this.oSceneObj.nCurruntLeval+1}`



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
                    x: { start: nTempx + 50, to: this.oSceneObj.stars.x },
                    y: { start: nTempy + 20, to: this.oSceneObj.stars.y },
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
                this.oSceneObj.winning_level_txt.text = `LEVEL : ${this.oSceneObj.nCurruntLeval+1}`
                
            }, 700);
        }

    }
}