export const bounce = function(point1, point2, vector) {
  let angle = point1.getDirectedAngle(point2)

  var xDiff = point2.x - point1.x;
        var yDiff = point2.y - point1.y;
        // console.log(Math.atan2(yDiff, xDiff) * (180 / Math.PI);
  return Math.atan2(yDiff, xDiff) * (180 / Math.PI)
}
