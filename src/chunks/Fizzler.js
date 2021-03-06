/*eslint-disable id-length */
import Tone from 'tone';
import Chunk from './Chunk';
import colors from '../colors';
import { fizz, twang } from '../tone/fizzler';
import { randomNumberWithinRange } from './utils';
import { particleGenerator } from './shapeGenerators';

export default class Fizzler extends Chunk {
  constructor(x, y, radius, direction = new Point(0, 0), color = colors.mangoTango, dispersion = new Point(-2, 2), fizzle = false) {
    super(direction, color);
    this.path = new Path.RegularPolygon({
      center: [x, y],
      sides: fizzle ? 7 : 6,
      radius: radius,
      fillColor: color,
      shadowColor: colors.blueStone,
      shadowBlur: 25,
      shadowOffset: new Point(3, 5)
    });
    this.fixed = true;
    this.particles = [];
    this.radius = radius;
    this.fizzle = fizzle;
    this.particleAges = [];
    this.numParticles = 15;
    this.particlesForceX = [];
    this.particlesForceY = [];
    this.dispersion = dispersion;
    this.redrawPos = new Point(x, y);
    this.synth = fizzle ? fizz : twang;
    this.type = 'fizzler';
  }

  update() {
    this.generateParticles();
    // always update the particles that fizzler emitted
    this.updateParticles();
  }

  updateRedrawPos() {
    // if the instance is a "crackler" the redrawPos should be tweaked
    let yPos = (this.fizzle)
              ? this.path.position.y + 1.48546698146
              : this.path.position.y;

    // Hard coded for now -- will break if the radius changes
    this.redrawPos = new Point(this.path.position.x, yPos);
  }

  // this function lets a user toggle from "Fizzler" to "Crackler"
  toggleMode() {
    this.fizzle = !this.fizzle;
    this.path.sides = this.fizzle ? 7 : 6;
    this.synth = this.fizzle ? fizz : twang;
  }

  generateParticles(color = colors.supernova) {
    while (this.particles.length < this.numParticles) {

      let lifespan = randomNumberWithinRange(0.5, 1);
      let velocity = randomNumberWithinRange(0.62, 1);
      let newParticle = particleGenerator(this.path.position, color);
      let fX = randomNumberWithinRange(this.dispersion.x, this.dispersion.y);
      let fY = randomNumberWithinRange(this.dispersion.x, this.dispersion.y);

      this.particleAges.push(lifespan);
      this.particlesForceX.push(fX);
      this.particlesForceY.push(fY);
      this.particles.push(newParticle);

      // trigger a sound every time a particle is emmited
      if (this.fizzle) {
        this.synth.triggerAttackRelease(0.3, Tone.Transport.now(), velocity);
      } else {
        this.synth.triggerAttack(Tone.Transport.now());
      }
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

  removeAllParticles () {
    this.particles = this.particles.filter(particle => {
      particle.remove();
      return false;
    });
  }
}
