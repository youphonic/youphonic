import { deconstruct, reconstruct } from './saver';

// helper function - clone and return a new copy of Chunk
export const clone = (chunk, grid) => {
  let duplicateObj = deconstruct([chunk]);
  for (let key in duplicateObj) {
    let chunk = duplicateObj[key];
    // Give new chunks an offset
    if (chunk.x && chunk.y && !chunk.redrawPos) {
      chunk.x += chunk.radius;
      chunk.y += chunk.radius;
    } else if (false) {
    } else if (chunk.redrawPos) {
      chunk.redrawPos.x += grid;
      chunk.redrawPos.y += grid;
    }
    // update property format to suit the reconstruct function
    chunk.direction = [, chunk.direction.x, chunk.direction.y];
    if (chunk.redrawPos) {
      chunk.redrawPos = [, chunk.redrawPos.x, chunk.redrawPos.y];
    }
    // update Rope start/end properties to suit the reconstruct function
    if (chunk.start) {
      chunk.start = [, chunk.start.x + 10, chunk.start.y + 10]
    }
    if (chunk.end) {
      chunk.end = [, chunk.end.x + 10, chunk.end.y + 10]
    }
  }
  let duplicate = reconstruct(duplicateObj)[0];
  delete duplicate.x;
  delete duplicate.y;
  return duplicate;
}