import Chunk from './Chunk';
import { dropGenerator } from './shapeGenerators';
import { drawnChunksFilterOutId } from '../paper';
import { synthOne } from '../tone/tonePatchOne';
import { player, drumBuffers, possibilities } from '../tone/drums';

export default class Photon extends Chunk {
	constructor(x, y, size, direction, color, emitterId){
		super(direction, color);
		this.path = dropGenerator(x, y, size, color)
		this.type = 'photon';
		this.alreadyTriggeredChunkIds = [emitterId];
		this.causeHitResponse = false;
		this.triggerSynthResponse = false;
		this.frequency = 0;
	}

	react(shape) {
		if (!this.alreadyTriggeredChunkIds.includes(shape.id)) {
			if (shape.triggerSynthResponse) {
				synthOne.triggerAttackRelease(shape.frequency, '8n');
			}
			if (shape.drum) {
				player.buffer = drumBuffers.get(shape.drum);
				player.start();
			}
			this.addTriggeredChunk(shape.id);
		}
	}

	update(){
		// if Photon leaves screen, remove it from the Papersketch and the draw array
		if (this.path.position.x < 0 ||
				this.path.position.x > window.innerWidth ||
				this.path.position.y < 0 ||
				this.path.position.y > window.innerHeight) {
			this.path.remove();
			drawnChunksFilterOutId(this.id);
		}
	}

	// when Photon triggers another Chunk, add it to this array
	// Photons will only trigger any single Chunk one time
	addTriggeredChunk(id) {
		this.alreadyTriggeredChunkIds.push(id);
	}
}
