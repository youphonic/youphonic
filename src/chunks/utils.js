import colors from '../colors';


// Bounce Mechanics

export const movingBounceOffMoving = (obj1, obj2) => {
  var dist = obj1.path.position.getDistance(obj2.path.position);
  var overlap = obj1.radius + obj2.radius - dist;
  var direc = (obj1.path.position.subtract(obj2.path.position)).normalize(overlap);
  obj1.direction = obj1.direction.add(direc);
  obj2.direction = obj2.direction.subtract(direc);
}

export const movingBounceOffFixed = (obj1, obj2) => {
  var dist = obj1.path.position.getDistance(obj2.path.position);
  var overlap = obj1.radius + obj2.radius - dist;
  var direc = (obj1.path.position.subtract(obj2.path.position)).normalize(overlap);
  obj1.direction = obj1.direction.add(direc);
}

// Rectangle Bounce Physics
export const movingCircleBounceOffRectangle = (circle, rectangle) => {
  // array of collisions
  let collisions = rectangle.path.getIntersections(circle.path)
  // tangent of the collision
  let tangent = collisions[0].tangent;
  // rotate -90 degrees to get the Normal vector
  let rotTan = tangent.rotate(-90);

  // edge case - check to see if if unrotated rectangle corner is hit
  // ensure that vector is reflected correctly (mult by -1)
  let collisionSum =
    collisions.length === 2 ?
    (Math.abs(collisions[0].tangent.x + collisions[1].tangent.x) === 1 &&
    Math.abs(collisions[0].tangent.y + collisions[1].tangent.y) === 1) :
    false;
  if (collisionSum) {
    circle.direction = circle.direction.multiply(-1);
  // handle vector reflection
  // see http://www.3dkingdoms.com/weekly/weekly.php?a=2 for explanation of forumula
  } else {
    let dotProd = circle.direction.dot(rotTan)
    circle.direction = circle.direction.add(rotTan.multiply(-2 * dotProd))
  }
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

// keep an input within a min-max range
export const constrain = function(value, min, max) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  } else {
    return value;
  }
}

// scale input from within given range to output range
export const scale = (input, inMin, inMax, outMin, outMax) => {
  let percent = (input - inMin) / (inMax - inMin);
  return percent * (outMax - outMin) + outMin;
};

// radians to degrees
export function radToDeg(rad) {
  return rad * (180 / Math.PI);
}

// degrees to radians
export function degToRad(deg) {
  return deg * Math.PI / 180;
}