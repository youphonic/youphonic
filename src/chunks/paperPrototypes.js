
module.exports = function() {
  // 2d point addition
  Point.prototype.addPoint = function(newPoint) {
    let newX = this.x + newPoint.x;
    let newY = this.y + newPoint.y;
    return new Point(newX, newY);
  }

  // 2d point subtraction
  Point.prototype.subtractPoint = function(newPoint) {
    let newX = this.x - newPoint.x;
    let newY = this.y - newPoint.y;
    return new Point(newX, newY);
  }
}
