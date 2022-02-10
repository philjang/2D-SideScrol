# 2D-SideScrol

Simple video games always send me back to childhood. Many popular games today emphasize complexity and realism, but some of the games that provided me with the most enjoyment were quite simple. As an homage to those earlier, albeit not the earliest, generations of video games, this will be a side-scrolling game of survival. Emulating classics that graced early consoles and machines running the likes of Windows 95, users will play a character collecting some nondescript form of currency and avoiding the bad guys. 

## Technologies Used
+ The game page HTML elements were laid out and styled with CSS 
+ A combination of Flexbox and Grid were used for positioning
+ Javascript was used for DOM manipulation to change the text displayed and for canvas manipulation
+ An html canvas element was utilized for gameplay rendering with collision detection and sprites for gamepiece animations
+ Adobe illustrator was used for creating spritesheets


<!-- wireframe -->
***
![Wireframe](./img/wireframe.png)
***

## Development Approach

The general workflow began with laying out objectives for a minimum viable product to first build a funcioning game. 

+ Start screen with understandable instructions
DOM manipulation and css animation
+ User controllable character via arrow keys
Boolean object container with keyboard events
+ NPC movement (right to left in varying speeds for mvp, requiring user to maneuver around them as they collect coins)
Object manipulation with gamepiece object classes and canvas rendering 
+ Timer/Scoretracker
Javascript interval with counter function and DOM manipulation for display
+ End game conditions with collision detection (game ends if PC collides with NPC)
Axis aligned bounding boxes with conditionals for collision detection, triggering endgame function
+ Reset capability
Initializer function linked by event listener to button and keyboard events
Invoked post endgame function, resets variables to replayable state with text prompts

Once the fundamental functionality of the gameplay was achieved, the page was styled to be more aesthetically pleasing using images, fonts, and better proportions for positioning, before moving onto additional functional components. Code was refactored throughout the development process, but especially after achieving the functionality components of mvp, to minimize line count and increase modularity. Some of the stretch goals were achieved, including variance in npc movement, pc movement being limited by gravity simulation, and a moving background. Thereafter, sprite sheets were used to add more appeal to the action of gameplay, making the playable character and other game objects appear more dynamic. 

### Unsolved problems

Some of the stretch goals yet to be achieved include adding a decrementing health component, environmental obstacles, and a more dynamic background setting. The game also has some potential for elaboration using additional game pieces (e.g. power-up items and tools). It would also benefit from improved visual design as well as further variance in graphics animations and gamepiece movement.

### Resources
+ Animate.css 
+ Google fonts 
+ itch.io and gameart2d.com for game assets
+ MDN and W3schools for canvas and sprite tutorial