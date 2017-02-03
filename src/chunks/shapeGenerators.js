// generic rhombus generator
// currently used to construct Emitter body
export const rhombusGenerator = (startx, starty, length, angle, color = 'white') => {
  // top left
  var point1 = [startx, starty];
  // top right
  var point2 = [startx + length, starty];
  // bottom right
  var point3 = [(Math.sin(angle) * length + startx + length), (Math.cos(angle) * length + starty)];
  // bottom left
  var point4 = [Math.sin(angle) * length + startx, Math.cos(angle) * length + starty];
  // construct a Path from the four segments
  var newRhombus = new Path({
    segments: [point1, point2, point3, point4],
    fillColor: color,
    closed: true
  })
  return newRhombus
}

// this generates a drop shape
// in this, height represents height of trailing triangle only
// is utilized currently by the Emitter Chunk
export const dropGenerator = (x, y, size, color) => {
		let w = size / 2;
		let h = size;
    // 'left side' of the triangle/arc
    var fromPoint = new Point(x+w, y)
    // apex of the arc
    var throughPoint = new Point(x + w/2, y - (w/2));
    // 'right side' of the triangl/arc
    var toPoint = new Point(x, y)
    // draw arc
    var path = new Path.Arc(fromPoint, throughPoint, toPoint);
    path.fillColor = color;
    // draw triangle
    // build a new Path to hold the triangle
    let resultPath = new Path();
    resultPath.fillColor = color
    resultPath.add(fromPoint)
    // bottom point of the triangle
    resultPath.add(new Point(x+ w/2, y + h))
    resultPath.add(toPoint)
    // fill the shape
    resultPath.closed = true;
    // groups the two together
    return new Group([path, resultPath])
}
