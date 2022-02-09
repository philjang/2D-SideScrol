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

// // experimenting with mobile interface
// const touch = {}
// document.addEventListener('touchstart', ()=> {touch.randomword = true});
// document.addEventListener('touchend', ()=> {touch.randomword = false});
// || touch.randomword) // in pc.mov()

/* CANVAS RENDERING */
const ctx = canvas.getContext("2d");

// sets canvas to be the size the element takes up (improve resolution)
canvas.setAttribute("width", getComputedStyle(canvas)["width"]);
canvas.setAttribute("height", getComputedStyle(canvas)["height"]);

/* GAME FUNCTIONS */
// resolution at x: 1510 ,y: 550

// gameloop variables
// time since start
let seconds = -1;

// sprite archetype
// let srcXcoin="";
// let srcYcoin="";
// const sheetWidth = 80;
// const sheetHeight = 16;
// let coincCols = 5;
// const frameCount = 0;
// const width = sheetWidth/cols;
// function updateFrame (){
    // currentFrame = ++currentFrame % coinCols;
    // srcXcoin = currentFrame*16
    // srcY = 0
    // ctx.clearRect(0,0,500,500)
// }
// function drawImage(){
//     updateFrame()
//     ctx.drawImage(coinSprite, srcXcoin, 0, 16, 16, 40, 40, 20, 20)
// }
// setInterval(drawImage,50)


// sprite variables
let currentFrameC = 0;
let currentFramePC = 0;
const coinSprite = new Image();
coinSprite.src = "img/coin.png";
const pcRightSprite = new Image();
pcRightSprite.src = "img/pcRight.png";
const npc1sprite = new Image();
npc1sprite.src = "img/npc1.png";
const npc2sprite = new Image();
npc2sprite.src = "img/npc2.png"


let srcXcoin="";
let srcXPC="";
// let coincCols = 5;
// let PCCols = 8;



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
// window.addEventListener('load', ()=>{
//     console.log("i'm ready")
    document.addEventListener("keyup", (e) => {
        if (e.key === " " && seconds === -1) initialize();
    });
    startBtn.addEventListener("click", initialize);
// });

function initialize() {
    instructions.style.display = "none"; // removes intro banner
    seconds = 0 // reset timer
    coinMold.coinsCollected = 0; // reset coin counter
    timerDiv.innerText = "00:00"; // reset time display
    coinDiv.innerText = "x 0"; // reset coin display
    subDiv.innerText = ""; // clear game over message   
    pc = new gamePiece(100, 400, 50, 50, "blue", 10, pcRightSprite, 100, 100);
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
    npc1 = new npcMold(1550, 350, 100, 100, "red", 10, npc1sprite, 100, 100);
    npc2 = new npcMold(1550, 350, 100, 100, "green", 20, npc2sprite, 100, 100);
    coin1 = new coinMold(1490, 200, 20, 20, "yellow", 5, coinSprite, 16, 16);
    coin2 = new coinMold(1540, 160, 20, 20, "yellow", 5, coinSprite, 16, 16);
    coin3 = new coinMold(1610, 160, 20, 20, "yellow", 5, coinSprite, 16, 16);
    coin4 = new coinMold(1660, 200, 20, 20, "yellow", 5, coinSprite, 16, 16);
    // begin intervals for stopwatch and gameloop
    gameInterval = setInterval(gameLoop, 50);
    timer = setInterval(changeSeconds, 1000);
    startBtn.style.display = "none"; // remove start btn from view
}
// object class for game pieces
class gamePiece {
    constructor(inputX, inputY, inputW, inputH, inputC, inputS, inputI, inputSW, inputSH) {
        this.xpos = inputX;
        this.ypos = inputY;
        this.width = inputW;
        this.height = inputH;
        this.color = inputC;
        this.speed = inputS;
        this.image = inputI;
        this.srcW = inputSW;
        this.srcH = inputSH;
    } 

    // method to render for each frame
    render() {
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.xpos, this.ypos, this.width, this.height);

    // drawImage(newimagevar, srcX, srcY, srcW, srcH, x, y, w, h)
        ctx.drawImage(this.image, srcXPC, 0, this.srcW, this.srcH, this.xpos, this.ypos, this.width, this.height)
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
    constructor(inputX, inputY, inputW, inputH, inputC, inputS, inputI, inputSW, inputSH) {
        super(inputX, inputY, inputW, inputH, inputC, inputS, inputI, inputSW, inputSH);
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
    constructor(inputX, inputY, inputW, inputH, inputC, inputS, inputI, inputSW, inputSH) {
        super(inputX, inputY, inputW, inputH, inputC, inputS, inputI, inputSW, inputSH);
    }

    render() {
        ctx.drawImage(this.image, srcXcoin, 0, this.srcW, this.srcH, this.xpos, this.ypos, this.width, this.height)
    }

    hitResponse() {
        if (super.detectHit()) {
            coinMold.coinsCollected++;
            console.log("hit detected with " + this.color);
            this.ypos = -100; // send coin off screen
            // console.log(coinMold.coinsCollected) // check total coin count
            // display coin count in div
            coinDiv.innerText = `x ${coinMold.coinsCollected}`;
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
    if (seconds % 5 === 0 && npc1.xpos < 0) npc1 = new npcMold(1550, 350, 100, 100, randomColor(), randomNpcS() - 5, npc1sprite, 100, 100); // keeps one slower so they do not bunch together making the game too easy
    if (seconds % 5 === 0 && npc2.xpos < 0) npc2 = new npcMold(1900, 350, 100, 100, randomColor(), randomNpcS(), npc2sprite, 100, 100);
    if (seconds % 10 === 0 && coin4.xpos < 0) {
        // coins continually speed up as npc's do
        coin1 = new coinMold(1500, randomY(), 20, 20, "yellow", 5 + seconds / 15, coinSprite, 16, 16);
        coin2 = new coinMold(1600, randomY(), 20, 20, "yellow", 5 + seconds / 15, coinSprite, 16, 16);
        coin3 = new coinMold(1700, randomY(), 20, 20, "yellow", 5 + seconds / 15, coinSprite, 16, 16);
        coin4 = new coinMold(1800, randomY(), 20, 20, "yellow", 5 + seconds / 15, coinSprite, 16, 16);
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
    instructions.innerText = `You scored ${Math.floor(seconds * 0.8 + coinMold.coinsCollected * 2.5)} points!\n\n Tap "space" or click "Start" to beat your last score!`;
    subDiv.innerText = `GAME OVER...`;
    // clear gameloop and timer intervals
    clearInterval(gameInterval);
    clearInterval(timer);
    // bring back start button
    startBtn.style.display = "inline-block";
    ctx.clearRect(0, 0, canvas.width, canvas.height); // removes glitchy restart
    seconds = -1;
}

// declaration allows global scope
function gameLoop() {

    currentFrameC = ++currentFrameC%5;
    srcXcoin = currentFrameC*16
    currentFramePC = ++currentFramePC%8;
    srcXPC = currentFramePC*100

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
}
