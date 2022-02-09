// // pc object
// const pc = {
//     xpos: 100,
//     ypos: 400,
//     width: 50,
//     height: 50,
//     color: 'blue',
//     // jumpGravity: 0,
//     jumpTime: 0,
//     render: () => {
//         ctx.fillStyle = pc.color
//         ctx.fillRect(pc.xpos, pc.ypos, pc.width, pc.height)
//     },
//     move: ()=> {
//         const speed = 10 // set increment value to move per keydown
//         if(keysDown.ArrowLeft) pc.xpos -= speed
//         if(keysDown.ArrowRight) pc.xpos += speed
//         if(pc.ypos === 400&&keysDown.ArrowUp) {
//             pc.jumpTime = 0.01
//             pc.ypos = 400+(-100*pc.jumpTime+10*pc.jumpTime**2)
//         }
//         if(pc.ypos<400) {
//             pc.jumpTime += 0.7
//             pc.ypos = 400+(-100*pc.jumpTime+10*pc.jumpTime**2)
//         }
//         if(pc.ypos>400) pc.ypos = 400 // prevents overshoot from gravity
//     }
// }

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
// class npcMold {
//     static totalRendered = -1
//     constructor (inputH, inputC, inputS) {
//         this.xpos = 1500 // render at edge of screen
//         this.ypos = 450 - inputH // vertical position rendered
//         // size of npc
//         this.width = 50 
//         this.height = inputH
//         this.color = inputC // npc color
//         this.speed = inputS // npc speed
//         npcMold.totalRendered++
//     }
//     // method to render for each frame
//     render() {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.xpos, this.ypos, this.width, this.height)
//     }
//     // dictates npc movement 
//         move() {
//         this.xpos -= this.speed
//     }
//     // checks for overlap of objects at each frame
//     detectHit() {
//         // compare relation of pc and this npc
//         const pcRight = pc.xpos + pc.width >= this.xpos
//         const pcLeft = pc.xpos <= this.xpos + this.width
//         const pcTop = pc.ypos <= this.ypos + this.height
//         const pcBottom = pc.ypos + pc.height >= this.ypos
//         // if all 4 true, then possibility for hit
//         if(pcRight&&pcLeft&&pcTop&&pcBottom) {
//             console.log('hit detected with '+this.color) // check hitbox
//             endGame()
//         }
//     }
// }

// pc.jumpTime = 0
// pc.move = ()=> {
//     const speed = 10 // set increment value to move per keydown
//     if(keysDown.ArrowLeft) pc.xpos -= speed
//     if(keysDown.ArrowRight) pc.xpos += speed
//     if(pc.ypos === 400&&keysDown.ArrowUp) {
//         pc.jumpTime = 0.01
//         pc.ypos = 400+(-100*pc.jumpTime+10*pc.jumpTime**2)
//     }
//     if(pc.ypos<400) {
//         pc.jumpTime += 0.7
//         pc.ypos = 400+(-100*pc.jumpTime+10*pc.jumpTime**2)
//     }
//     if(pc.ypos>400) pc.ypos = 400 // prevents overshoot from gravity
// }

// enemy types on screen at same time
// let npc1 = new npcMold(100,'red', 10)
// let npc2 = new npcMold(100,'green', 20)

// // coin factory -- same logic as npc, but collision = +coin
// class coinMold {
//     static coinsCollected = 0 
//     constructor (inputX, inputY) {
//         this.xpos = inputX
//         this.ypos = inputY
//         this.width = 20
//         this.height = 20
//         this.color = 'yellow'
//     }
//     render() {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.xpos, this.ypos, this.width, this.height)
//     }
//     move() {
//         this.xpos -= 5
//     }
//     detectHit() {
//         const pcRight = pc.xpos + pc.width >= this.xpos
//         const pcLeft = pc.xpos <= this.xpos + this.width
//         const pcTop = pc.ypos <= this.ypos + this.height
//         const pcBottom = pc.ypos + pc.height >= this.ypos
//         if(pcRight&&pcLeft&&pcTop&&pcBottom) {
//             coinMold.coinsCollected++
//             console.log('hit detected with '+this.color)
//             this.ypos = -100 // send coin off screen
//             // console.log(coinMold.coinsCollected) // check total coin count
//             // display coin count in div
//             coinDiv.innerText = `${coinMold.coinsCollected} coins`
//         }
//     }
// }

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
// const componentArr = [pc, npc1, npc2, coin1, coin2, coin3, coin4]

// // new npc when last is off screen
// const npcInterval = setInterval(npcCreator, 5000)
// function npcCreator () {
//     if(npc1.xpos<0) npc1 = new npcMold(100, 'red', 10)
//     if(npc2.xpos<0) npc2 = new npcMold(100, 'green', 20)
//     // console.log(npcMold.totalRendered) // check total npc avoided
// }

// // new coins every 30 secodns
// const coinInterval = setInterval(coinCreator, 5000)
// function coinCreator () {
//     coin1 = new coinMold(1490,200)
//     coin2 = new coinMold(1540,160)
//     coin3 = new coinMold(1610,160)
//     coin4 = new coinMold(1660,200)
// }

// // end game
// function endGame() {
//     subDiv.innerText = `GAME OVER... You avoided ${npcMold.totalRendered} enemies and collected ${coinMold.coinsCollected} coins.`
//     clearInterval(gameInterval)
//     clearInterval(timer)
// }

// let pc = new gamePiece(100, 400, 50, 50, 'blue', 10) // placeholder to keep pc a global variable readable as gamePiece

// // first enemies placeholder
// let npc1 = new npcMold(1500, 350, 50, 100, 'red', 10)
// let npc2 = new npcMold(1500, 350, 50, 100, 'green', 20)
// // inputY = 450-desired height

// // coins on screen at same time
// // first coins placeholder
// let coin1 = new coinMold(1490,200, 20, 20, 'yellow', 5)
// let coin2 = new coinMold(1540,160, 20, 20, 'yellow', 5)
// let coin3 = new coinMold(1610,160, 20, 20, 'yellow', 5)
// let coin4 = new coinMold(1660,200, 20, 20, 'yellow', 5)

// // new object positions
// pc.render()
// npc1.render()
// npc2.render()
// coin1.render()
// coin2.render()
// coin3.render()
// coin4.render()
// // check for collision before move
// npc1.hitResponse() 
// npc2.hitResponse()
// coin1.hitResponse()
// coin2.hitResponse()
// coin3.hitResponse()
// coin4.hitResponse()
// // movement for next frame
// pc.move()
// npc1.move()
// npc2.move()
// coin1.move()
// coin2.move()
// coin3.move()
// coin4.move()

// gameloop variables
// time since start
// let seconds = -1;
// // gameloop frequency, set in initialize()
// let gameInterval = ""
// // stopwatch interval
// let timer = ""

// // return random hexcode string
// function randomColor() {
//     return "#" + Math.floor(Math.random() * 16777215).toString(16);
// }