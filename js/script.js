// link check
console.log('hello')

/* DOM SELECTORS and EVENT LISTENERS */
const canvas = document.getElementById('canvas')
const keysDown = {}
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
    render: () => {
        ctx.fillStyle = pc.color
        ctx.fillRect(pc.xpos, pc.ypos, pc.width, pc.height)
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
        }
    }
}

// enemy types
let npc1 = new npcMold(100,'red', 10)
let npc2 = new npcMold(100,'green', 20)

// coin object
const coin = {
    xpos: 1490,
    ypos: 530,
    width: 20,
    height: 20,
    color: 'yellow',
    render: () => {
        ctx.fillStyle = coin.color
        ctx.fillRect(coin.xpos, coin.ypos, coin.width, coin.height)
    }
}

// // make character
// ctx.fillRect(pc.xpos, pc.ypos, pc.width, pc.height)
// ctx.fillStyle = pc.color

// // test character creation
// pc.render()
// npc.render()
// coin.render()

// KeyboardEvent.repeat = boolean true if the key is being held down and automatically repeating
// KeyboardEvent.shiftKey = boolean true if shift key active when key event generated 

// function for player movement
function pcMove() {
    const speed = 20 // set increment value to move per keydown
    if(keysDown.ArrowLeft) pc.xpos -= speed
    if(keysDown.ArrowRight) pc.xpos += speed
    if(keysDown.ArrowUp) pc.ypos -= speed
    if(keysDown.ArrowDown) pc.ypos += speed
}


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

function gameLoop () { // declaration allows global scope
    // start gameloop with clear screen
    ctx.clearRect(0,0, canvas.width, canvas.height)
    // new object positions
    pc.render()
    npc1.render()
    npc2.render()
    coin.render()
    // check for collision before move
    npc1.detectHit() 
    npc2.detectHit()
    // movement for next frame
    pcMove()
    npc1.move()
    npc2.move()

}


// new npc when last is off screen
const npcInterval = setInterval(npcCreator, 5000)
function npcCreator () {
    if(npc1.xpos<0) npc1 = new npcMold(100, 'red', 10)
    if(npc2.xpos<0) npc2 = new npcMold(100, 'green', 20)
    
    // console.log(npcMold.totalRendered) // check total npc avoided
}



// document.addEventListener('DOMContentLoaded', {

// })