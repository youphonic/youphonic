var circle = new Path.Circle(new Point(100, 100), 50)
circle.fillColor = '#EF503B';
circle.shadowColor = '#BEE2A7';
circle.shadowOffset = new Point(5, 5);
circle.shadowBlur = 20;

var circle2 = new Path.Circle(new Point(100, 100), 50)
circle2.fillColor = {
    gradient: {
        stops: [['#125E68', 0.05], ['#BEE2A7', 1]],
        radial: true
    },
    origin: circle.position,
    destination: circle.bounds.rightCenter
};
circle2.shadowColor = '#A9D7BF';
circle2.shadowOffset = new Point(5, 5);
circle2.shadowBlur = 20;

var circle3 = new Path.Circle(new Point(100, 100), 50)
circle3.fillColor = {
    gradient: {
        stops: [['#125E68', 0.05], ['#BEE2A7', 1]],
        radial: true
    },
    origin: circle.position,
    destination: circle.bounds.rightCenter
};
circle3.shadowColor = '#A9D7BF';
circle3.shadowOffset = new Point(5, 5);
circle3.shadowBlur = 20;

function onFrame(event) {
    circle.rotate(2)
    circle.shadowOffset.x = Math.cos(event.time*4) * 10;
    circle.shadowOffset.y = Math.sin(event.time*4)* 10;
    circle2.rotate(2)
    circle2.shadowOffset.x = Math.cos(event.time*2) * 10;
    circle2.shadowOffset.y = Math.sin(event.time*2)* 10;
    circle3.rotate(2)
    circle3.shadowOffset.x = Math.cos(event.time*3) * 10;
    circle3.shadowOffset.y = Math.sin(event.time*3)* 10;
}