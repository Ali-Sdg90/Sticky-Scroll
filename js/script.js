const leg = document.querySelector(".game-box__sticky-man-leg");
const ball = document.querySelector(".game-box__ball");

let scrolled = 0;
let lastScrolled = -1;
let startPosition = -1;
let startTiming = true;
let startTime = 0;
let timeScrolled = 0;
let score = 0;
window.addEventListener("scroll", function () {
    scrolled =
        (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

    if (lastScrolled < scrolled) {
        if (startTiming) {
            console.log("Count");
            startTime = Date.parse(new Date());
            startPosition = scrolled;
            startTiming = false;
        }
        if (scrolled >= "99.9") {
            timeScrolled = new Date() - startTime;
            console.log(timeScrolled);
            shoot();
            console.log("reset time");
            setTimeout(() => {
                lastScrolled = -1;
                startTiming = true;
                console.log("end of reset");
            }, 3000);
        }
        lastScrolled = scrolled;
    } else {
        startTiming = true;
    }
    leg.style.transform = `translate(-50%, -50%) rotate(-${scrolled * 1.3}deg)`;
});

function shoot() {
    score = ((100 - startPosition)*10 / timeScrolled) * 500;
    console.log("=>", score);
    ball.style.transform = `translate(-50%, -50%) translate(${score}px ,0px)`;
    setTimeout(() => {
        ball.style.transform = "translate(-50%, -50%) translate(0px ,0px)";
    }, 2500);
}
