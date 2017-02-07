import axios from 'axios';
import Circle from '../chunks/Circle';
import PhysBall from '../chunks/PhysBall';
import Attractor from '../chunks/Attractor';
import Springer from '../chunks/Springer';
import Pendulum from '../chunks/Pendulum';
import Rectangle from '../chunks/Rectangle';
import Emitter from '../chunks/Emitter';
import Rope from '../chunks/Rope';


import { removeAllShapePaths } from '../paper'

export const save = (allChunks) => {
  window.localStorage.setItem('savedChunks', JSON.stringify({
    savedChunks: deconstruct(allChunks)
  }));
};

// called in UserMenu component as 'Save Play'
// requires logged in user, errors in console silently with 401 if not
export const savePlay = (user, allChunks) => {
	const playToSave = JSON.stringify(deconstruct(allChunks));
	axios.post('api/plays', {
		player_id: user.id,
		playJson: playToSave
		})
		.then(response => console.log(response))
		.catch(error => console.log(error));
};

//called in UserMenu component as 'Get Plays'
//route requires logged in user, errors in console silently with 401
//if not logged in
export const getMyPlays = (user) => {
	axios.get(`api/plays/${user.id}`, user)
		.then(foundPlays => console.log(JSON.parse(foundPlays)))
		.catch(error => console.log(error));
};

export const load = (allChunks, clearAllChunks, addChunk) => {
  // Pull all chunks off local storage
  let savedChunks = reconstruct(JSON.parse(window.localStorage.getItem('savedChunks')).savedChunks);
  // If there are any stored chunks ...
  if (savedChunks && savedChunks.length) {
    // Get rid of the chunks that were being drawn
    allChunks.forEach(chunk => chunk.path.remove());
    removeAllShapePaths();
    // Take all chunks out of the Redux Store
    clearAllChunks();
    // Add the saved chunks to the Redux Store
    savedChunks.forEach(chunk => {
      addChunk(chunk);
    });
  }
};


// serialize and deserialize chunks
export const deconstruct = (allChunks) => {
  const saved = {};
  allChunks.forEach(chunk => {
    // Copy everything stored in chunk
    saved[chunk.id] = Object.assign({}, chunk);
    // Chunks x & y position don't get copied
    // so we do this manually
    saved[chunk.id].x = chunk.path.position._x;
    saved[chunk.id].y = chunk.path.position._y;
  });
  return saved;
};

export const reconstruct = (savedChunks) => {
  const ressurected = [];
  // loop through the saved chunks object
  for (var chunk in savedChunks) {
    if (savedChunks.hasOwnProperty(chunk)) {
      let props = savedChunks[chunk], // properties for the new chunk
          reborn; // var for the new chunk
      // make a new chunk depending on type
      switch (props.type) {
        case 'circle':
          // Construct a new Circle
          reborn = new Circle(
            props.x,
            props.y,
            props.radius,
            new Point(props.direction[1], props.direction[2]),
            props.color
          );
          break;

        case 'physics':
          // Construct a new PhysBall
          reborn = new PhysBall(
            props.x,
            props.y,
            props.radius,
            new Point(props.direction[1], props.direction[2]),
            props.color
          );
          break;

        case 'attractor':
          // Construct a new Attractor
          reborn = new Attractor(
            props.x,
            props.y,
            props.radius,
            new Point(props.direction[1], props.direction[2]),
            props.color,
            props.fixed,
            props.G
          );
          break;

        case 'springer':
          // Construct a new Springer
          reborn = new Springer(
            props.x,
            props.y,
            props.radius,
            new Point(props.direction[1], props.direction[2]),
            props.restLength,
            props.color
          );
          break;

        case 'pendulum':
          // Construct a new Pendulum
          reborn = new Pendulum(
            props.x,
            props.y,
            props.radius,
            new Point(props.direction[1], props.direction[2]),
            props.color,
            props.strRad
          );
          break;

        case 'rectangle':
          // Construct a new Rectangle
          reborn = new Rectangle(
            props.redrawPos[1],
            props.redrawPos[2],
            props.width,
            props.height,
            new Point(props.direction[1], props.direction[2]),
            props.color
          );
          break;

				case 'emitter':
          console.log(props);
          // Construct a new Emitter
          // TODO: Check with Robbyn on how this is moving over to right at pause then play
          reborn = new Emitter(
            props.redrawPos[1],
            props.redrawPos[2],
            props.length,
            props.color
          );
          break;

        case 'rope':
          reborn = new Rope(
            props.start.x,
            props.start.y,
            props.end.x,
            props.end.y,
            props.color
          )
          break;

        default:
          reborn = {};
          break;
      }

      // Put remaining props onto the new chunk
      for (var prop in props) {
        if (props.hasOwnProperty(prop) && !reborn[prop]) {
          reborn[prop] = props[prop];
        }
      }

      ressurected.push(reborn);
    }
  }
  return ressurected;
};
