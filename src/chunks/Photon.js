import Chunk from './Chunk'
import { dropGenerator } from './shapeGenerators'
import { shapesFilterOutId } from '../paper'

export default class Photon extends Chunk {
		constructor(x, y, size, direction, color){
		super(direction, color)

		this.path = dropGenerator(x, y, size, color)
		this.type = 'photon';
	}
	update(){
		if (this.path.position.x < 0 || this.path.position.x > window.innerWidth || this.path.position.y < 0 || this.path.position.y > window.innerHeight){
			this.path.remove();
			shapesFilterOutId(this.id);
	}

		this.path.position = this.path.position.add(this.direction);
	}
}
