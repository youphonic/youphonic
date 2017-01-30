// import paper from 'paper';

// set up canvas
// const canvas = document.getElementById('paperCanvas');

import store from '../store';
import { selectChunk } from '../redux/chunk';
import { synthOne, synthTwo } from '../tone/tonePatchOne'

module.exports = function() {
	var tool = new Tool()
	tool.minDistance = 1;
	tool.maxDistance = 30;

	var hitOptions = {
	segments: true,
	stroke: true,
	fill: true,
	tolerance: 5
};

// The amount of circles we want to make:
	var count = 100;

	// Space Circle Path:
	var circlePath = new Path.Circle({
		center: [0, 0],
		radius: 10,
		fillColor: 'white',
		strokeColor: 'white',
		shadowColor: 'cyan',
		shadowBlur: 10,
		shadowOffset: [(Math.floor(Math.random() * 4) - 2), (Math.floor(Math.random() * 4) - 2)]
	});

	var symbol = new Symbol(circlePath);

	// Place the instances of the symbol:
	for (var i = 0; i < count; i++) {
		// The center position is a random point in the view:
		var center = new Point((Math.random() * view.size.width), Math.random() * view.size.height);
		var placedSymbol = symbol.place(center);
		// symbol.fillColor.hue += (Math.random() * 8)
		placedSymbol.scale(i / count);
		placedSymbol.direction = 2 * Math.PI * Math.random()
	}

	// The onFrame function is called up to 60 times a second:
	// view.onFrame = (event) => {
	// 	// Run through the active layer's children list and change
	// 	// the position of the placed symbols:
	// 	for (var i = 0; i < count; i++) {
	// 		var item = project.activeLayer.children[i];

	// 		// Move the item 1/20th of its width. This way
	// 		// larger circles move faster than smaller circles:
	// 		var speed = item.bounds.width / 30;
	// 		item.position.x += Math.cos(item.direction) * speed;
	// 		item.position.y += Math.sin(item.direction) * speed;

	// 		// If the item has the view, move it back
	// 		if (item.bounds.left > view.size.width) {
	// 			item.position.x = item.bounds.width;
	// 		}
	// 		if (item.bounds.right < 0) {
	// 			item.position.x = view.size.width
	// 		}
	// 		if (item.bounds.bottom < 0) {
	// 			item.position.y = view.size.height
	// 		}
	// 		if (item.bounds.top > view.size.height) {
	// 			item.position.y = 0
	// 		}
	// 	}
	// }

	var segment, path;
	var movePath = false;
	tool.onMouseDown = (event) => {
		segment = path = null;
		var hitResult = project.hitTest(event.point, hitOptions);
		if (!hitResult)
			return;

		if (event.modifiers.shift) {
			if (hitResult.type == 'segment') {
				hitResult.segment.remove();
			}
			return;
		}

		if (hitResult) {
			path = hitResult.item;
			console.log('path', path);
			if (hitResult.type == 'segment') {
			console.log('segment', hitResult);
				segment = hitResult.segment;
			} else if (hitResult.type == 'stroke') {
				console.log('stroke', hitResult);
				var location = hitResult.location;
				segment = path.insert(location.index + 1, event.point);
				path.smooth();
			} else {
				console.log('logic not hit');
			}
		}
		movePath = hitResult.type == 'fill';
		if (movePath)
			project.activeLayer.addChild(hitResult.item);
	}

tool.onMouseMove = (event) => {
	project.activeLayer.selected = false;
	if (event.item)
		event.item.selected = true;
}

tool.onMouseDrag = (event) => {
	if (segment) {
		console.log('segment');
		console.log(segment);
		console.log('path');
		console.log(path);
		// segment.point += event.delta;
		// path.smooth();
	} else if (path) {
		// console.log('path', path);
		path.position.x += event.delta.x;
		path.position.y += event.delta.y;
	}
}
}
