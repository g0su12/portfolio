const revealQueue = [
    document.getElementById("experience"),
    document.getElementById("projects"),
    document.getElementById("education"),
];

revealQueue.forEach((section, index) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 350ms ease, transform 350ms ease";

    window.setTimeout(() => {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
    }, 600 + index * 250);
});

const flyingCats = [...document.querySelectorAll(".flying-cat")];
const catStates = flyingCats.map((cat, index) => {
    const speed = Number(cat.dataset.speed);
    const direction = (index / flyingCats.length) * Math.PI * 2 + Math.random() * 0.65;

    return {
        element: cat,
        x: Math.random() * Math.max(0, window.innerWidth - cat.offsetWidth),
        y: Math.random() * Math.max(0, window.innerHeight - cat.offsetHeight),
        vx: Math.cos(direction) * speed,
        vy: Math.sin(direction) * speed,
    };
});

let previousFrameTime = performance.now();

function keepCatInsideViewport(catState) {
    const maxX = Math.max(0, window.innerWidth - catState.element.offsetWidth);
    const maxY = Math.max(0, window.innerHeight - catState.element.offsetHeight);

    catState.x = Math.min(Math.max(catState.x, 0), maxX);
    catState.y = Math.min(Math.max(catState.y, 0), maxY);
}

function animateFlyingCats(frameTime) {
    const deltaTime = Math.min((frameTime - previousFrameTime) / 1000, 0.04);
    previousFrameTime = frameTime;

    catStates.forEach((catState) => {
        const maxX = Math.max(0, window.innerWidth - catState.element.offsetWidth);
        const maxY = Math.max(0, window.innerHeight - catState.element.offsetHeight);

        catState.x += catState.vx * deltaTime;
        catState.y += catState.vy * deltaTime;

        if (catState.x <= 0 || catState.x >= maxX) {
            catState.x = Math.min(Math.max(catState.x, 0), maxX);
            catState.vx *= -1;
        }

        if (catState.y <= 0 || catState.y >= maxY) {
            catState.y = Math.min(Math.max(catState.y, 0), maxY);
            catState.vy *= -1;
        }

        const reflectedAngle = Math.atan2(catState.vy, catState.vx) * (180 / Math.PI);
        catState.element.style.setProperty("--cat-tilt", `${reflectedAngle * 0.12}deg`);
        catState.element.style.transform = `translate3d(${catState.x}px, ${catState.y}px, 0)`;
    });

    window.requestAnimationFrame(animateFlyingCats);
}

window.addEventListener("resize", () => {
    catStates.forEach(keepCatInsideViewport);
});

window.requestAnimationFrame(animateFlyingCats);
