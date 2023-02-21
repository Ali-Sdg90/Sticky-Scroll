const leg = document.querySelector(".game-box__sticky-man-leg");

let scrolled = 0;
let lastScrolled = -1;
let startTiming = true;
let startTime = 0;
window.addEventListener("scroll", function () {
    scrolled =
        (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

    if (lastScrolled < scrolled) {
        if (startTiming) {
            console.log("Count");
            startTime = Date.parse(new Date());
            startTiming = false;
        }
        if (scrolled >= "99.9") {
            console.log(new Date() - startTime);
            console.log("reset time");
            setTimeout(() => {
                lastScrolled = -1;
                startTiming = true;
                console.log("end of reset");
            }, 5000);
        }
        lastScrolled = scrolled;
    } else {
        startTiming = true;
    }
    leg.style.transform = `translate(-50%, -50%) rotate(-${scrolled * 1.3}deg)`;
});
