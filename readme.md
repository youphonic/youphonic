# musicmachine
======

## MVP Goal
------
Create and deploy an app where a user can:
* Add shapes to a canvas
* Reposition the shapes they have added
* Select shapes and edit their properties
* Press play to set the shapes in motion
* Once in motion, shapes will respond to collisions by:
⋅⋅* Bouncing off of other shapes
⋅⋅* Changing color
⋅⋅* Making a sound
* Press pause to stop the animation

## What works:
------
So far, our deployed MVP allows users to add shapes to the canvas, reposition these shapes, select shapes to edit their frequency property, and set the shapes in motion using the play button. Shapes also bounce off of each other and the boundaries of the canvas, change color when they collide, and make a sound on collision. Users can also pause the animation.

## What doesn't work yet:
------
The app currently comes with a seeded state with stationary objects. This needs to be replaced by giving the user the option to set shapes as  stationary or moving and giving them a direction and velocity. Many other options are planned to give the user more freedom to control the parameters of the interface which are still in development. Currently circles colliding with rectangles and moving circles colliding with other moving circles will not interact.

## Open / Unresolved Questions:
------
Our team has doubts as to whether the P5.js library is the best one to use for our app. Other more robust libraries such as Paper.js have other features which we plan to explore in the coming days. Testing is also very difficult using P5.js as a frontend library.

## Code we'd like you to look at:
------
* Getting P5 to play with React-Redux has been a challenge. Currently we're instantiating 'ourP5' in the P5Wrapper component and exporting it so we can import it wherever else it's needed.
* We're proud of our main drawing loop in index.js located in src/sketches. Take a look!
* Check out our class inheritance structure for chunks (parent of circles/rectangles) in src/chunks folder.

## How to build and use musicmachine:
------
After you git clone:
* npm run startup (this installs, builds, and starts for you)
* navigate to localhost:1337
* npm test (for test suite)
