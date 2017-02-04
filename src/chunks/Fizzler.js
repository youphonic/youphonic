/*eslint-disable id-length */
import Chunk from './Chunk';
import colors from '../colors';
import { randomNumberWithinRange } from './utils';
import { particleGenerator } from './shapeGenerators';

export default class Fizzler extends Chunk {
  constructor(x, y, radius, direction = new Point(0, 0), color = 'white', dispersion = {x: -2, y: 2}) {
    super(direction, color);
    this.path = new Path.RegularPolygon({
      center: [x, y],
      sides: 6,
      radius: radius,
      fillColor: color
    });
    this.fixed = true;
    this.particles = [];
    this.particleAges = [];
    this.numParticles = 20;
    this.particlesForceX = [];
    this.particlesForceY = [];
    this.dispersion = dispersion;
    this.radius = radius;

    this.type = 'fizzler';
  }

  generateParticles(color = colors.salmon) {
    while (this.particles.length < this.numParticles) {

      let lifespan = randomNumberWithinRange(0.5, 1);
      let newParticle = particleGenerator(this.path.position, color);
      let fX = randomNumberWithinRange(this.dispersion.x, this.dispersion.y);
      let fY = randomNumberWithinRange(this.dispersion.x, this.dispersion.y);

      this.particleAges.push(lifespan);
      this.particlesForceX.push(fX);
      this.particlesForceY.push(fY);
      this.particles.push(newParticle);

      // trigger a sound every time a particle is emmited
      this.triggerSound();
    }
  }

  updateParticles() {
    //render and animate particles
    for (let i = 0; i < this.particles.length; i++) {
      let fX = this.particlesForceX[i];
      let fY = this.particlesForceY[i];
      let alphaValue = this.particleAges[i];
      this.particles[i].fillColor.alpha = alphaValue;
      this.particles[i].position.x += fX;
      this.particles[i].position.y += fY;
    }

    //change opacity of particles
    for (let i = 0; i < this.particles.length; i++) {
      if (this.particleAges[i] > 0) {
        let alphaValue = this.particleAges[i];
        this.particleAges[i] = alphaValue -= 0.006;
      }
    }

    //remove particles based on age (alpha)
    for (let i = 0; i < this.particles.length; i++) {
      if (this.particleAges[i] <= 0) {
        this.particles[i].remove();
        this.particles.splice(i, 1);
        this.particlesForceX.splice(i, 1);
        this.particlesForceY.splice(i, 1);
        this.particleAges.splice(i, 1);
      }
    }
  }

  triggerSound() {
    // trigger a sound
  }
}
