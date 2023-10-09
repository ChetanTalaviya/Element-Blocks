class UiManager {
    constructor(oSceneObj) {
        this.oSceneObj = oSceneObj;
        const self = this;

        this.diamond = new Diamond(this.oSceneObj, 117, 536);
        this.bom = new Bom(this.oSceneObj, 120, 642);

        this.oSceneObj.side_cont.add(this.bom)
        this.oSceneObj.side_cont.add(this.diamond)

    }

    setWinnwrAnimation() {

        setTimeout(() => {
            for (let index_col = 0; index_col < 8; index_col++) {
                for (let index_row = 0; index_row < 8; index_row++) {
                    this.oSceneObj.tweens.add({
                        targets: this.oSceneObj.AllImageObj[index_col][index_row],
                        props: {
                            x: { value: Math.floor(Math.random() * 1500), duration: 5000, },
                            y: { value: 1000, duration: 2000, },
                        },
                        ease: 'Sine.easeInOut',
                    });
                }
            }
            setTimeout(() => {
                this.oSceneObj.scene.restart();
            }, 3500);
        }, 1500);


        var duration = 2 * 1000;
        var animationEnd = Date.now() + duration;
        var skew = 1;

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        (function frame() {
            var timeLeft = animationEnd - Date.now();
            var ticks = Math.max(200, 500 * (timeLeft / duration));
            skew = Math.max(0.8, skew - 0.001);

            confetti({
                particleCount: 1,
                startVelocity: 0,
                ticks: ticks,
                origin: {
                    x: Math.random(),
                    // since particles fall down, skew start toward the top
                    y: (Math.random() * skew) - 0.2
                },
                colors: ['#ffffff'],
                shapes: ['circle'],
                gravity: randomInRange(0.4, 0.6),
                scalar: randomInRange(0.4, 1),
                drift: randomInRange(-0.4, 0.4)
            });

            if (timeLeft > 0) {
                requestAnimationFrame(frame);
            }
        }());
    }
}