// link check
console.log('hello')

/* DOM SELECTORS and EVENT LISTENERS */
const canvas = document.getElementById('canvas')

/* CANVAS RENDERING */
const ctx = canvas.getContext('2d')

// //research
// // sets canvas to be the size the element takes up (improve resolution)
canvas.setAttribute('width', getComputedStyle(canvas)["width"])
canvas.setAttribute('height', getComputedStyle(canvas)["height"])

// gameloop
// const gameInterval = setInterval(gameLoop, 100)

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

// npc object
const npc = {
    xpos: 1000,
    ypos: 400,
    width: 50,
    height: 100,
    color: 'red',
    render: () => {
        ctx.fillStyle = npc.color
        ctx.fillRect(npc.xpos, npc.ypos, npc.width, npc.height)
    }
}

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




// function gameLoop () { // declaration allows global scope
//     // start gameloop with clear screen
//     pc.render()
//     npc.render()
//     coin.render()
// }

pc.render()
npc.render()
coin.render()



// document.addEventListener('DOMContentLoaded', {

// })