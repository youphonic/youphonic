export const bounce = function(point1, point2, vector) {
  let angle = point1.getDirectedAngle(point2)

  var xDiff = point2.x - point1.x;
        var yDiff = point2.y - point1.y;
        // console.log(Math.atan2(yDiff, xDiff) * (180 / Math.PI);
  return Math.atan2(yDiff, xDiff) * (180 / Math.PI)
}

export const reBounce = function(obj1, obj2, vector) {
  let point1 = obj1.path.position;
  let point2 = obj2.path.position;
  console.log(point1);
  // let normal = point1.getDirectedAngle(point2) + 90;
  // let dotProd = point1.dot(point2);

  let dx = point1.x - point2.x
  let dy = point1.y - point2.y
  let distance = Math.hypot(dx, dy);
  let tangent = Math.atan2(dy, dx)
  point1.angle = 2 * tangent - point1.angle;
  point2.angle = 2 * tangent - point2.angle;
  let temp = obj1.direction
  obj1.direction = obj2.direction
  obj2.direction = temp
  console.log('1', obj1.direction);
  console.log('2', obj2.direction);
}