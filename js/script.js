/* DOM SELECTORS and EVENT LISTENERS */
const canvas = document.getElementById("canvas");
const timerDiv = document.getElementById("timer");
const coinDiv = document.getElementById("coins");
const subDiv = document.getElementById("sub");
const startBtn = document.getElementById("start-btn");
const instructions = document.getElementById("instructions");
// object to store key status
const keysDown = {};
// key event listeners for pc movement
document.addEventListener("keydown", (e) => (keysDown[e.key] = true));
document.addEventListener("keyup", (e) => (keysDown[e.key] = false));
// KeyboardEvent.key = domstring of key

/* CANVAS RENDERING */
const ctx = canvas.getContext("2d");

// sets canvas to be the size the element takes up (improve resolution)
canvas.setAttribute("width", getComputedStyle(canvas)["width"]);
canvas.setAttribute("height", getComputedStyle(canvas)["height"]);

/* GAME FUNCTIONS */
// resolution at x: 1510 ,y: 550

// gameloop variables
// time since start
let seconds = 0;
// // gameloop frequency, set in initialize()
// let gameInterval = ""
// // stopwatch interval
// let timer = ""

// timer function
const changeSeconds = () => {
    seconds++;
    // convert num to string for padStart
    const minuteString = Math.floor(seconds / 60).toString();
    const secondString = (seconds % 60).toString();
    let masterTime = `${minuteString.padStart(2, "0")}:${secondString.padStart(2, "0")}`;
    // display timer in div
    timerDiv.innerText = masterTime;
};

// start function
// space key listener for start btn
document.addEventListener("keyup", (e) => {
    if (e.key === " " && seconds === 0) initialize();
});
startBtn.addEventListener("click", initialize);
function initialize() {
    instructions.style.display = "none"; // removes intro banner
    // seconds = 0 // reset timer
    coinMold.coinsCollected = 0; // reset coin counter
    timerDiv.innerText = "00:00"; // reset time display
    coinDiv.innerText = ""; // reset coin display
    subDiv.innerText = ""; // clear game over message
    pc = new gamePiece(100, 400, 50, 50, "blue", 10);
    pc.jumpTime = 0; // add property of jumpTime for gravity calculations
    // player movement function as key-value pair
    pc.move = () => {
        const speed = 10; // set increment value to move per keydown
        if (keysDown.ArrowLeft) pc.xpos -= speed;
        if (keysDown.ArrowRight) pc.xpos += speed;
        if (pc.ypos === 400 && keysDown.ArrowUp) {
            pc.jumpTime = 0.01;
            pc.ypos = 400 + (-100 * pc.jumpTime + 10 * pc.jumpTime ** 2);
        }
        if (pc.ypos < 400) {
            pc.jumpTime += 0.7;
            pc.ypos = 400 + (-100 * pc.jumpTime + 10 * pc.jumpTime ** 2);
        }
        if (pc.ypos > 400) pc.ypos = 400; // prevents overshoot from gravity
    };
    // spawn first wave
    npc1 = new npcMold(1510, 350, 50, 100, "red", 10);
    npc2 = new npcMold(1510, 350, 50, 100, "green", 20);
    coin1 = new coinMold(1490, 200, 20, 20, "yellow", 5);
    coin2 = new coinMold(1540, 160, 20, 20, "yellow", 5);
    coin3 = new coinMold(1610, 160, 20, 20, "yellow", 5);
    coin4 = new coinMold(1660, 200, 20, 20, "yellow", 5);
    // begin intervals for stopwatch and gameloop
    gameInterval = setInterval(gameLoop, 50);
    timer = setInterval(changeSeconds, 1000);
    startBtn.style.display = "none"; // remove start btn from view
}
// object class for game pieces
class gamePiece {
    constructor(inputX, inputY, inputW, inputH, inputC, inputS) {
        this.xpos = inputX;
        this.ypos = inputY;
        this.width = inputW;
        this.height = inputH;
        this.color = inputC;
        this.speed = inputS;
    }
    // method to render for each frame
    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xpos, this.ypos, this.width, this.height);
    }
    // dictates movement
    move() {
        this.xpos -= this.speed;
    }
    detectHit() {
        // compare relation of pc and this npc
        const pcRight = pc.xpos + pc.width >= this.xpos;
        const pcLeft = pc.xpos <= this.xpos + this.width;
        const pcTop = pc.ypos <= this.ypos + this.height;
        const pcBottom = pc.ypos + pc.height >= this.ypos;
        // if all 4 true, then there is collision
        if (pcRight && pcLeft && pcTop && pcBottom) {
            return true;
        } else return false;
    }
}

// npc subclass
class npcMold extends gamePiece {
    constructor(inputX, inputY, inputW, inputH, inputC, inputS) {
        super(inputX, inputY, inputW, inputH, inputC, inputS);
    }
    // checks for overlap of objects at each frame
    hitResponse() {
        if (super.detectHit()) {
            // console.log('hit detected with '+this.color) // check hitbox
            endGame();
        }
    }
}

// coin subclass
class coinMold extends gamePiece {
    static coinsCollected = 0;
    constructor(inputX, inputY, inputW, inputH, inputC, inputS) {
        super(inputX, inputY, inputW, inputH, inputC, inputS);
    }
    hitResponse() {
        if (super.detectHit()) {
            coinMold.coinsCollected++;
            console.log("hit detected with " + this.color);
            this.ypos = -100; // send coin off screen
            // console.log(coinMold.coinsCollected) // check total coin count
            // display coin count in div
            coinDiv.innerText = `${coinMold.coinsCollected} coins`;
        }
    }
}

// return random speed between 9 and 25
function randomNpcS() {
    return Math.floor(Math.random() * 17 + 9) + seconds / 5; // progressively increases average speed
}
// return random hexcode string
function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
// random ypos generator for coins in range of 171-400
function randomY() {
    return Math.floor(Math.random() * 230 + 171);
}

// function to place new pieces on canvas
function spawn() {
    if (seconds % 5 === 0 && npc1.xpos < 0) npc1 = new npcMold(1500, 350, 50, 100, randomColor(), randomNpcS() - 5); // keeps one slower so they do not bunch together making the game too easy
    if (seconds % 5 === 0 && npc2.xpos < 0) npc2 = new npcMold(1800, 350, 50, 100, randomColor(), randomNpcS());
    if (seconds % 10 === 0 && coin4.xpos < 0) {
        // coins continually speed up as npc's do
        coin1 = new coinMold(1500, randomY(), 20, 20, "yellow", 5 + seconds / 15);
        coin2 = new coinMold(1600, randomY(), 20, 20, "yellow", 5 + seconds / 15);
        coin3 = new coinMold(1700, randomY(), 20, 20, "yellow", 5 + seconds / 15);
        coin4 = new coinMold(1800, randomY(), 20, 20, "yellow", 5 + seconds / 15);
        // for(let i =0; i<coinArr.length; i++) {
        //     const coinArr = [coin1, coin2, coin3, coin4]
        //     coinArr[i] = new coinMold(1500+i*100, randomY(), 20, 20, 'yellow', 5+seconds/15)
        //     }
    }
}

// end game
function endGame() {
    // display results
    instructions.style.display = "flex"; // bring back banner for score display
    instructions.innerText = `You scored ${Math.floor(seconds * 0.8 + coinMold.coinsCollected * 2.5)} points!\n\n Tap "space" or click Start to beat your last score!`;
    subDiv.innerText = `GAME OVER... You collected ${coinMold.coinsCollected} coins and survived for ${seconds} seconds.`;
    // clear gameloop and timer intervals
    clearInterval(gameInterval);
    clearInterval(timer);
    // bring back start button
    startBtn.style.display = "inline-block";
    ctx.clearRect(0, 0, canvas.width, canvas.height); // removes glitchy restart
    seconds = 0;
}

function gameLoop() {
    // declaration allows global scope
    // start gameloop with clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spawn();
    // arr for game pieces
    const componentArr = [pc, npc1, npc2, coin1, coin2, coin3, coin4];
    // new object positions
    componentArr.forEach((e) => e.render());
    // check for collision before move for all pices except pc
    componentArr.forEach((e, i) => {
        if (i > 0) e.hitResponse();
    });
    // movement for next frame
    componentArr.forEach((e) => e.move());
    console.log(pc)
}
