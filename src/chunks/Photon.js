import Chunk from './Chunk'
import { dropGenerator } from './shapeGenerators'
import { shapesFilterOutId } from '../paper'

export default class Photon extends Chunk {
	constructor(x, y, size, direction, color){
		super(direction, color);
		this.path = dropGenerator(x, y, size, color)
		this.type = 'photon';
		this.alreadyTriggeredChunkIds = [];
		this.causeHitResponse = false;
	}

	update(){
		// if Photon leaves screen, remove it from the Papersketch and the draw array
		if (this.path.position.x < 0 ||
				this.path.position.x > window.innerWidth ||
				this.path.position.y < 0 ||
				this.path.position.y > window.innerHeight) {
			this.path.remove();
			shapesFilterOutId(this.id);
		}
		// else update position
		this.path.position = this.path.position.add(this.direction);
	}

	// when Photon triggers another Chunk, add it to this array
	// Photons will only trigger any single Chunk one time
	addTriggeredChunk(id) {
		this.alreadyTriggeredChunkIds.push(id);
	}
}
