import colors from '../colors';
import Circle from './Circle';

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

// serialize and deserialize chunks
export const deconstruct = (allChunks) => {
  const saved = {};
  allChunks.forEach(chunk => {
    saved[chunk.type] = {
      x: chunk.path.position._x,
      y: chunk.path.position._y,
      radius: chunk.radius,
      dirX: chunk.direction.x,
      dirY: chunk.direction.y,
      color: chunk.color
    };
  });
  return saved;
};

export const reconstruct = (savedChunks) => {
  const ressurected = [];
  for (var chunk in savedChunks) {
    if (savedChunks.hasOwnProperty(chunk)) {
      let props = savedChunks[chunk];
      let reborn = new Circle(
        props.x,
        props.y,
        props.radius,
        new Point(props.dirX, props.dirY),
        props.color
      );
      ressurected.push(reborn);
    }
  }
  return ressurected;
};
