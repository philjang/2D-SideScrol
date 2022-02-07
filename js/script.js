// link check
console.log('hello')

/* DOM SELECTORS and EVENT LISTENERS */
const canvas = document.getElementById('canvas')
const timerDiv = document.getElementById('timer')
const coinDiv = document.getElementById('coins')
// object to store key status
const keysDown = {}
// key event listeners for pc movement
document.addEventListener('keydown', e => keysDown[e.key] = true )
document.addEventListener('keyup', e => keysDown[e.key] = false )
// KeyboardEvent.key = domstring of key

/* CANVAS RENDERING */
const ctx = canvas.getContext('2d')

// //research
// // sets canvas to be the size the element takes up (improve resolution)
canvas.setAttribute('width', getComputedStyle(canvas)["width"])
canvas.setAttribute('height', getComputedStyle(canvas)["height"])

// gameloop frequency
const gameInterval = setInterval(gameLoop, 50)

// timer function
let seconds = 0
const changeSeconds = () => {
    seconds++
      // convert num to string for padStart
      const minuteString = (Math.floor(seconds/60)).toString()
      const secondString = (seconds%60).toString()
      let masterTime = `${minuteString.padStart(2,'0')}:${secondString.padStart(2,'0')}`
      // display timer in div
      timerDiv.innerText = masterTime
}
const timer = setInterval(changeSeconds, 1000)

// console.log(canvas) // check canvas
// console.log(ctx) // check context2D object

/* GAME FUNCTIONS */
// resolution at x: 1510 ,y: 550

// pc object
const pc = {
    xpos: 100,
    ypos: 400,
    width: 50,
    height: 50,
    color: 'blue',
    // jumpGravity: 0,
    jumpTime: 0,
    render: () => {
        ctx.fillStyle = pc.color
        ctx.fillRect(pc.xpos, pc.ypos, pc.width, pc.height)
    },
    move: ()=> {
        const speed = 10 // set increment value to move per keydown
        if(keysDown.ArrowLeft) pc.xpos -= speed
        if(keysDown.ArrowRight) pc.xpos += speed
        if(pc.ypos === 400&&keysDown.ArrowUp) {
            pc.jumpTime = 0.01
            pc.ypos = 400+(-100*pc.jumpTime+10*pc.jumpTime**2)
        }
        if(pc.ypos<400) {
            pc.jumpTime += 0.7
            pc.ypos = 400+(-100*pc.jumpTime+10*pc.jumpTime**2)
        }
        if(pc.ypos === 400) pc.jumpTime = 0



        // // reset gravity to 0 when pc touches ground
        // if(pc.ypos === 400) {
        //     pc.jumpGravity = 0
        // }
        // // function to add gravity once in air
        // if(pc.ypos<400) { // airborne parameters
        //     if(keysDown.ArrowUp) {
        //         pc.jumpGravity += 2
        //         pc.ypos += 20+pc.jumpGravity
        //     } else pc.ypos += 15
        // }
        // if(keysDown.ArrowUp) pc.ypos -= 45
        if(pc.ypos>400) pc.ypos = 400 // prevents overshoot from gravity
    }

}

// // npc object -- test archetype
// const npc = {
//     xpos: 1000,
//     ypos: 400,
//     width: 50,
//     height: 100,
//     color: 'red',
//     render: () => {
//         ctx.fillStyle = npc.color
//         ctx.fillRect(npc.xpos, npc.ypos, npc.width, npc.height)
//     }
// }

// npc factory
class npcMold {
    static totalRendered = 0
    constructor (inputH, inputC, inputS) {
        this.xpos = 1500 // render at edge of screen
        this.ypos = 450 - inputH // vertical position rendered
        // size of npc
        this.width = 50 
        this.height = inputH
        this.color = inputC // npc color
        this.speed = inputS // npc speed
        npcMold.totalRendered++
    }
    // method to render for each frame
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.xpos, this.ypos, this.width, this.height)
    }
    // dictates npc movement 
        move() {
        this.xpos -= this.speed
    }
    // checks for overlap of objects at each frame
    detectHit() {
        // compare relation of pc and this npc
        const pcRight = pc.xpos + pc.width >= this.xpos
        const pcLeft = pc.xpos <= this.xpos + this.width
        const pcTop = pc.ypos <= this.ypos + this.height
        const pcBottom = pc.ypos + pc.height >= this.ypos
        // if all 4 true, then possibility for hit
        if(pcRight&&pcLeft&&pcTop&&pcBottom) {
            console.log('hit detected with '+this.color) // check hitbox
            endGame()
        }
    }
}

// enemy types on screen at same time
let npc1 = new npcMold(100,'red', 10)
let npc2 = new npcMold(100,'green', 20)

// coin factory -- same logic as npc, but collision = +coin
class coinMold {
    static coinsCollected = 0 
    constructor (inputX, inputY) {
        this.xpos = inputX
        this.ypos = inputY
        this.width = 20
        this.height = 20
        this.color = 'yellow'
    }
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.xpos, this.ypos, this.width, this.height)
    }
    move() {
        this.xpos -= 5
    }
    detectHit() {
        const pcRight = pc.xpos + pc.width >= this.xpos
        const pcLeft = pc.xpos <= this.xpos + this.width
        const pcTop = pc.ypos <= this.ypos + this.height
        const pcBottom = pc.ypos + pc.height >= this.ypos
        if(pcRight&&pcLeft&&pcTop&&pcBottom) {
            coinMold.coinsCollected++
            console.log('hit detected with '+this.color)
            this.ypos = -100 // send coin off screen
            // console.log(coinMold.coinsCollected) // check total coin count
            // display coin count in div
            coinDiv.innerText = `${coinMold.coinsCollected} coins`
        }
    }
}

// coins on screen at same time
let coin1 = new coinMold(1490,200)
let coin2 = new coinMold(1540,160)
let coin3 = new coinMold(1610,160)
let coin4 = new coinMold(1660,200)


// // make character
// ctx.fillRect(pc.xpos, pc.ypos, pc.width, pc.height)
// ctx.fillStyle = pc.color

// // test character creation
// pc.render()
// npc.render()
// coin.render()

// KeyboardEvent.repeat = boolean true if the key is being held down and automatically repeating
// KeyboardEvent.shiftKey = boolean true if shift key active when key event generated 

// // function for player movement
// function pcMove() {
//     const speed = 20 // set increment value to move per keydown
//     if(keysDown.ArrowLeft) pc.xpos -= speed
//     if(keysDown.ArrowRight) pc.xpos += speed
//     if(keysDown.ArrowUp) pc.ypos -= speed
//     if(keysDown.ArrowDown) pc.ypos += speed
// }


// function detectHit() {
//     // if true, then possibility for hit
//     const pcRight = pc.xpos + pc.width >= npc1.xpos
//     const pcLeft = pc.xpos <= npc1.xpos + npc1.width
//     const pcTop = pc.ypos <= npc1.ypos + npc1.height
//     const pcBottom = pc.ypos + pc.height >= npc1.ypos
//     if(pcRight&&pcLeft&&pcTop&&pcBottom) {
//         console.log('hit detected') // check hitbox
//     }
// }
const componentArr = [pc, npc1, npc2, coin1, coin2, coin3, coin4]

function gameLoop () { // declaration allows global scope
    // start gameloop with clear screen
    ctx.clearRect(0,0, canvas.width, canvas.height)
    console.log(seconds)

    // componentArr.forEach( e => e.render())
    // componentArr.forEach( (e,i) => {if(i>0) e.detectHit()})
    // componentArr.forEach( e => e.move())

    // new object positions
    pc.render()
    npc1.render()
    npc2.render()
    coin1.render()
    coin2.render()
    coin3.render()
    coin4.render()
    // check for collision before move
    npc1.detectHit() 
    npc2.detectHit()
    coin1.detectHit()
    coin2.detectHit()
    coin3.detectHit()
    coin4.detectHit()
    // movement for next frame
    pc.move()
    npc1.move()
    npc2.move()
    coin1.move()
    coin2.move()
    coin3.move()
    coin4.move()

}


// new npc when last is off screen
const npcInterval = setInterval(npcCreator, 5000)
function npcCreator () {
    if(npc1.xpos<0) npc1 = new npcMold(100, 'red', 10)
    if(npc2.xpos<0) npc2 = new npcMold(100, 'green', 20)
    // console.log(npcMold.totalRendered) // check total npc avoided
}

// new coins every 30 secodns
const coinInterval = setInterval(coinCreator, 30000)
function coinCreator () {
    coin1 = new coinMold(1490,200)
    coin2 = new coinMold(1540,160)
    coin3 = new coinMold(1610,160)
    coin4 = new coinMold(1660,200)
}

// end game
function endGame() {
    console.log(`GAME OVER... You avoided ${npcMold.totalRendered} enemies and collected ${coinMold.coinsCollected} coins.`)
    clearInterval(gameInterval)
    clearInterval(npcInterval)
    clearInterval(coinInterval)
}


// document.addEventListener('DOMContentLoaded', {

// })