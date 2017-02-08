/*globals Path Point Group*/
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
  });
  return newRhombus;
};

// this generates a drop shape
// in this, height represents height of trailing triangle only
// is utilized currently by the Emitter Chunk
export const dropGenerator = (x, y, size, color) => {
		let w = size / 2;
		let h = size;
    // 'left side' of the triangle/arc
    var fromPoint = new Point(x + w, y);
    // apex of the arc
    var throughPoint = new Point(x + w / 2, y - (w / 2));
    // 'right side' of the triangl/arc
    var toPoint = new Point(x, y);
    // draw arc
    var path = new Path.Arc(fromPoint, throughPoint, toPoint);
    path.fillColor = color;
    // draw triangle
    // build a new Path to hold the triangle
    let resultPath = new Path();
    resultPath.fillColor = color;
    resultPath.add(fromPoint);
    // bottom point of the triangle
    resultPath.add(new Point(x + w / 2, y + h));
    resultPath.add(toPoint);
    // fill the shape
    resultPath.closed = true;
    resultPath.shadowColor = '#125E68';
    resultPath.shadowBlur = 5;
    resultPath.shadowOffset = new Point(1, 1);
    // groups the two together
    return new Group([path, resultPath]);
};

// for now this just makes a tiny Circle
// may want to make a more interesting shape in the future
export const particleGenerator = (position, color, radius = 3) => {
  let particle = new Path.Circle(position, radius);
  particle.fillColor = color;
  return particle;
};

export const droneGenerator = (position, radius, color) => {
  let circle1 = new Path.Circle(position, radius);
  circle1.fillColor = color;
  circle1.shadowColor = color;
  circle1.shadowOffset = new Point(2, 2);
  circle1.shadowBlur = 20;

  let circle2 = new Path.Circle(position, radius);
  circle2.fillColor = color;
  circle2.shadowColor = color;
  circle2.shadowOffset = new Point(2, 2);
  circle2.shadowBlur = 20;

  let circle3 = new Path.Circle(position, radius);
  circle3.fillColor = color;
  circle3.shadowColor = color;
  circle3.shadowOffset = new Point(2, 2);
  circle3.shadowBlur = 20;

  return new Group([circle1, circle2, circle3]);
};
