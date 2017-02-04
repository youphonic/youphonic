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
  // console.log('arrow length', start.subtract(end).length);
  let radius = Math.round(start.subtract(end).length);
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

// Alignment drawing
export const drawAlignment = function(start) {
  var horizontalLine = new Path([
      new Point(0, start.y),
      start,
      new Point(start.x + window.innerWidth, start.y)
    ]);
  horizontalLine.strokeColor = 'black';
  var verticalLine = new Path([
        new Point(start.x, 0),
        start,
        new Point(start.x, start.y + window.innerHeight)
      ]);
  verticalLine.strokeColor = 'black';
  let lines = new Group([
    horizontalLine,
    verticalLine
  ]);
  return lines;
};

const thingsAreClose = (selected, comparison) => {
  let selectedX = selected.x ? selected.x : selected.path.position.x,
      selectedY = selected.y ? selected.y : selected.path.position.y,
      comparisonX = comparison.path.position.x,
      comparisonY = comparison.path.position.y,
      dist = selected.x ? 50 : 10;
  // returns true if comparison path's position i
  // within 10 pixels of the selected path
  if ((comparisonX <= selectedX + dist) && (comparisonX >= selectedX - dist)) {
    return 'xIntersect';
  }
  if ((comparisonY >= selectedY - dist) && (comparisonY <= selectedY + dist)) {
    return 'yIntersect';
  }
  return false;
};

export const nearIntersect = (selected, allChunks, delta, point, grid) => {
  let x = selected.path.position.x + Math.round(delta.x / grid) * grid,
      y = selected.path.position.y + Math.round(delta.y / grid) * grid;

  selected.aligned = false;

  for (var i = 0; i < allChunks.length; i++) {
    let chunk = allChunks[i];
    let chunksIntersect = thingsAreClose(selected, chunk);
    let mouseIntersects = thingsAreClose(point, chunk);
    if (chunk.id !== selected.id && chunksIntersect && mouseIntersects) {
      switch (chunksIntersect) {
        case 'xIntersect':
          x = chunk.path.position.x;
          // y = selected.path.position.y + Math.round(delta.y / grid) * grid;
          selected.aligned = true;
          break;

        case 'yIntersect':
          // x = selected.path.position.x + Math.round(delta.x / grid) * grid;
          y = chunk.path.position.y;
          selected.aligned = true;
          break;
      }
    }
  }

  return new Point(x, y);
};


export const constrain = function(value, min, max) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  } else {
    return value;
  }
}

export const scale = (input, inMin, inMax, outMin, outMax) => {
  let percent = (input - inMin) / (inMax - inMin);
  return percent * (outMax - outMin) + outMin;
}
