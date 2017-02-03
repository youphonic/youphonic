export const rhombusGenerator = (startx, starty, length, angle, color = 'white') => {
  var point1 = [startx, starty];
  var point2 = [startx + length, starty];
  var point3 = [(Math.sin(angle) * length + startx + length), (Math.cos(angle) * length + starty)];
  var point4 = [Math.sin(angle) * length + startx, Math.cos(angle) * length + starty];
  var newRhombus = new Path({
    segments: [point1, point2, point3, point4],
    fillColor: color,
    closed: true
  })
  return newRhombus
}

// in this, height represents height of trailing triangle only
export const dropGenerator = (x, y, w, h, color) => {
    let resultPath = new Path();
    resultPath.fillColor = color
    var fromPoint = new Point(x+w, y)
    var throughPoint = new Point(x + w/2, y - ((x - w)/2));
    var toPoint = new Point(x, y)
    // draw arc
    var path = new Path.Arc(fromPoint, throughPoint, toPoint);
    path.fillColor = color;
    // draw triangle
    resultPath.add(fromPoint)
    resultPath.add(new Point(x+ w/2, y + h))
    resultPath.add(toPoint)
    resultPath.closed = true;
    return new Group([path, resultPath])
}