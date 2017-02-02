import colors from '../colors'

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

export const movingCircleBounceOffFixedRectangle = function(circle, rect) {
  var dist = circle.path.position.getDistance(rect.center);
  var overlap = circle.radius + rect.radius - dist;
  let intersections = rect.path.getIntersections(circle.path);
  let normal = intersections[0].normal;
  console.log(normal)
  new Path({
    segments: [normal, rect.center],
    strokeColor: 'green'
  });

  var direct = (circle.path.position.add(normal)).normalize(overlap);
  var line = new Path(intersections[0].point, intersections[0].point.add(normal))
  line.strokeColor = 'red';
  console.log('rect rotation', rect.path.rotation);
  console.log('normal', normal);
  // rect.path.rotation += 1;
  circle.direction = circle.direction.add(direct);
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

// keep an input within an output range
export const constrain = function(value, min, max) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  } else {
    return value;
  }
}

// scale an input within range to the output range
export const scale = (input, inMin, inMax, outMin, outMax) => {
  let percent = (input - inMin) / (inMax - inMin);
  return percent * (outMax - outMin) + outMin;
}

function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}