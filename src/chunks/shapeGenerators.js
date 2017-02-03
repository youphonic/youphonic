export const  rhombusGeneratory = (startx, starty, angle, length, color = 'white') => {
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