import { deconstruct, reconstruct } from './saver';

// helper function - clone and return a new copy of Chunk
export const clone = (chunk, grid) => {
  let duplicateObj = deconstruct([chunk]);
  for (let key in duplicateObj) {
    if (duplicateObj.hasOwnProperty(key)) {
      let dupChunk = duplicateObj[key];
      // Give new dupChunks an offset
      if (dupChunk.x && dupChunk.y && !dupChunk.redrawPos) {
        dupChunk.x += dupChunk.radius;
        dupChunk.y += dupChunk.radius;
      } else if (dupChunk.redrawPos) {
        console.log('in the rect');
        dupChunk.x += grid;
        dupChunk.y += grid;
      }
      // update property format to suit the reconstruct function
      dupChunk.direction = [null, dupChunk.direction.x, dupChunk.direction.y];
      if (dupChunk.redrawPos) {
        dupChunk.redrawPos = [null, dupChunk.x, dupChunk.y];
      }
      // update Rope start/end properties to suit the reconstruct function
      if (dupChunk.start) {
        dupChunk.start = [null, dupChunk.start.x + 10, dupChunk.start.y + 10];
      }
      if (dupChunk.end) {
        dupChunk.end = [null, dupChunk.end.x + 10, dupChunk.end.y + 10];
      }
    }
  }
  let duplicate = reconstruct(duplicateObj)[0];
  delete duplicate.x;
  delete duplicate.y;
  return duplicate;
};
