import colors from '../colors';
// import Circle from './Circle';
// import PhysBall from './PhysBall';
// import Attractor from './Attractor';


// Bounce Mechanics

export const movingBounceOffMoving = function(obj1, obj2) {
  var dist = obj1.path.position.getDistance(obj2.path.position);
  var overlap = obj1.radius + obj2.radius - dist;
  var direc = (obj1.path.position.subtract(obj2.path.position)).normalize(overlap);
  obj1.direction = obj1.direction.add(direc);
  obj2.direction = obj2.direction.subtract(direc);
}

export const movingBounceOffFixed = function(obj1, obj2) {
  var dist = obj1.path.position.getDistance(obj2.path.position);
  var overlap = obj1.radius + obj2.radius - dist;
  var direc = (obj1.path.position.subtract(obj2.path.position)).normalize(overlap);
  obj1.direction = obj1.direction.add(direc);
}

// Arrowhead drawing
export const drawArrow = function(start, end, direction) {
  let arrowHead = new Path([
      end.add(direction.multiply(2).rotate(160)),
      end,
      end.add(direction.multiply(2).rotate(-160))
    ]);
  let arrowShaft = new Path([start, end])
  arrowHead.type = 'vectorArrow';
  arrowShaft.type = 'vectorArrow';
  let resultArrow =  new Group([
    arrowShaft,
    arrowHead
  ]);
  resultArrow.strokeWidth = 1.5 + Math.log(direction.length / 2);
  resultArrow.strokeColor = colors.flamingo;
  return resultArrow;
}

export const constrain = function(value, min, max) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  } else {
    return value;
  }
}

export const scale = (input, inMin, inMax, outMin, outMax) => {
  let percent = (input - inMin) / (inMax - inMin);
  return percent * (outMax - outMin) + outMin;
}

// // serialize and deserialize chunks
// export const deconstruct = (allChunks) => {
//   const saved = {};
//   allChunks.forEach(chunk => {
//     // Copy everything stored in chunk
//     saved[chunk.id] = Object.assign({}, chunk)
//     // Chunks x & y position don't get copied
//     // so we do this manually
//     saved[chunk.id].x = chunk.path.position._x
//     saved[chunk.id].y = chunk.path.position._y
//   });
//   return saved;
// };
//
// export const reconstruct = (savedChunks) => {
//   const ressurected = [];
//   // loop through the saved chunks object
//   for (var chunk in savedChunks) {
//     if (savedChunks.hasOwnProperty(chunk)) {
//       let props = savedChunks[chunk], // properties for the new chunk
//           reborn; // var for the new chunk
//       // make a new chunk depending on type
//       switch (props.type) {
//         case 'cirlcle':
//           // Construct a new circle
//           reborn = new Circle(
//             props.x,
//             props.y,
//             props.radius,
//             new Point(props.direction[1], props.direction[2]),
//             props.color
//           );
//           // Put remaining props onto the new circle
//           for (var prop in props) {
//             if (props.hasOwnProperty(prop) && !reborn[prop]) {
//               reborn[prop] = props[prop];
//             }
//           }
//           break;
//
//         case 'physics':
//           // Construct a new PhysBall
//           reborn = new PhysBall(
//             props.x,
//             props.y,
//             props.radius,
//             new Point(props.direction[1], props.direction[2]),
//             props.color
//           );
//           // Put remaining props onto the new circle
//           for (var prop in props) {
//             if (props.hasOwnProperty(prop) && !reborn[prop]) {
//               reborn[prop] = props[prop];
//             }
//           }
//           break;
//
//         case 'attractor':
//           // Construct a new Attractor
//           reborn = new Attractor(
//             props.x,
//             props.y,
//             props.radius,
//             new Point(props.direction[1], props.direction[2]),
//             props.color,
//             props.fixed,
//             props.G
//           );
//           // Put remaining props onto the new circle
//           for (var prop in props) {
//             if (props.hasOwnProperty(prop) && !reborn[prop]) {
//               reborn[prop] = props[prop];
//             }
//           }
//           break;
//         default:
//           reborn = {};
//           break;
//       }
//
//       ressurected.push(reborn);
//     }
//   }
//   return ressurected;
// };
