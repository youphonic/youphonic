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