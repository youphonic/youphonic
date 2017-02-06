import colors from '../colors';

// Bounce Mechanics
export const movingBounceOffMoving = (obj1, obj2) => {
  var dist = obj1.path.position.getDistance(obj2.path.position);
  var overlap = obj1.radius + obj2.radius - dist;
  var direc = (obj1.path.position.subtract(obj2.path.position)).normalize(overlap);
  obj1.direction = obj1.direction.add(direc);
  obj2.direction = obj2.direction.subtract(direc);
};

export const movingBounceOffFixed = (obj1, obj2) => {
  var dist = obj1.path.position.getDistance(obj2.path.position);
  var overlap = obj1.radius + obj2.radius - dist;
  var direc = (obj1.path.position.subtract(obj2.path.position)).normalize(overlap);
  obj1.direction = obj1.direction.add(direc);
};

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
};

// Alignment drawing
export const drawAlignment = function(start, x, y) {
  const lines = new Group([]);
  if (y) {
    var horizontalLine = new Path([
      new Point(0, start.y),
      start,
      new Point(start.x + window.innerWidth, start.y)
    ]);
    horizontalLine.strokeColor = new Color(0.4, 0.7);
    horizontalLine.dashArray = [10, 12];
    lines.addChild(horizontalLine);
  }
  if (x) {
    var verticalLine = new Path([
      new Point(start.x, 0),
      start,
      new Point(start.x, start.y + window.innerHeight)
    ]);
    verticalLine.strokeColor = new Color(0.4, 0.7);
    verticalLine.dashArray = [10, 12];
    lines.addChild(verticalLine);
  }
  return lines;
};

const thingsAreClose = (selected, comparison) => {
  let selectedX = selected.x ? selected.x : selected.path.position.x,
      selectedY = selected.y ? selected.y : selected.path.position.y,
      comparisonX = comparison.path.position.x,
      comparisonY = comparison.path.position.y,
      dist = selected.x ? 30 : 10,
      result = '';

  if ((comparisonX <= selectedX + dist) && (comparisonX >= selectedX - dist)) {
    result += 'xIntersect';
  }
  if ((comparisonY >= selectedY - dist) && (comparisonY <= selectedY + dist)) {
    result += 'yIntersect';
  }
  return result;
};

export const nearIntersect = (selected, allChunks, delta, point, grid) => {
  let x = selected.path.position.x + Math.round(delta.x / grid) * grid,
      y = selected.path.position.y + Math.round(delta.y / grid) * grid;

  selected.xAligned = false;
  selected.yAligned = false;

  for (var i = 0; i < allChunks.length; i++) {
    let chunk = allChunks[i];
    let chunksIntersect = thingsAreClose(selected, chunk);
    let mouseIntersects = thingsAreClose(point, chunk);
    if (chunk.id !== selected.id && chunksIntersect && mouseIntersects) {
      switch (chunksIntersect) {
        case 'xIntersect':
          x = chunk.path.position.x;
          selected.xAligned = true;
          break;

        case 'yIntersect':
          y = chunk.path.position.y;
          selected.yAligned = true;
          break;

        case 'xIntersectyIntersect':
          x = chunk.path.position.x;
          selected.xAligned = true;
          y = chunk.path.position.y;
          selected.yAligned = true;
          break;
      }
    }
  }

  return new Point(x, y);
};

// keep an input within a min-max range
export const constrain = function(value, min, max) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  } else {
    return value;
  }
};

// scale input from within given range to output range
export const scale = (input, inMin, inMax, outMin, outMax) => {
  let percent = (input - inMin) / (inMax - inMin);
  return percent * (outMax - outMin) + outMin;
};

export const randomNumberWithinRange = (low, high) => {
	let range = high - low;
	let randomNumber = low + (range) * Math.random();
	return randomNumber;
};

// radians to degrees
export function radToDeg(rad) {
  return rad * (180 / Math.PI);
};

// degrees to radians
export function degToRad(deg) {
  return deg * Math.PI / 180;
};
