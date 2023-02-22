const leg = document.querySelector(".game-box__sticky-man-leg");
const currentScore = document.getElementById("scores__current");
const highScore = document.getElementById("scores__highest");
const saveHighest = localStorage.getItem("stickManHighest");
const ball = document.querySelector(".game-box__ball");
// localStorage.clear();

let startPosition = -1;
let startTiming = true;
let highScoreValue = 0;
let lastScrolled = -1;
let startTime = 0;
let scrolled = 0;
let score = 0;

if (saveHighest) {
    highScore.value = saveHighest;
    highScoreValue = saveHighest;
}

window.addEventListener("scroll", function () {
    scrolled =
        (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

    if (lastScrolled < scrolled) {
        if (startTiming) {
            console.log("Count");
            startTime = Date.now();
            startPosition = scrolled;
            startTiming = false;
        }

        if (scrolled >= 99.9) {
            score = (
                ((100 - startPosition) *
                    10 *
                    (1000 / (Date.now() - startTime))) /
                5
            ).toFixed(2);

            if (score > 0) {
                console.log("=>", score);

                ball.style.transform = `translate(-50%, -50%) translate(${score}px ,0px)`;
                setTimeout(() => {
                    ball.style.transform =
                        "translate(-50%, -50%) translate(0px ,0px)";
                }, 1000);

                console.log("reset time");
                setTimeout(() => {
                    lastScrolled = -1;
                    startTiming = true;
                    console.log("end of reset");
                }, 1500);
                currentScore.value = score;

                if (Number(score) > Number(highScoreValue)) {
                    highScoreValue = score;
                    highScore.value = score;
                    localStorage.setItem("stickManHighest", score);
                }
                window.scrollTo({
                    top:
                        Math.random() *
                            document.documentElement.scrollHeight *
                            0.8 +
                        0.1 * document.documentElement.clientHeight,
                    behavior: "smooth",
                });
            }
        }
        lastScrolled = scrolled;
    } else {
        startTiming = true;
    }
    leg.style.transform = `translate(-50%, -50%) rotate(-${scrolled * 1.3}deg)`;
});
