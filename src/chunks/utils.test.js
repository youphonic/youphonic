import chai from 'chai';
const expect = chai.expect;

import { thingsAreClose, nearIntersect, constrain, scale, randomNumberWithinRange, degToRad, radToDeg } from './utils';

describe('paper/utils', () => {

  describe('thingAreClose', () => {
    let selected = {
      path: {
        position: {
          x: 1,
          y: 2,
        }
      }
    }
    let comparison = {
      path: {
        position: {
          x: 1,
          y: 2,
        }
      }
    }
    it('returns correct x/y intersect values', () => {
      expect(thingsAreClose(selected, comparison)).to.be.equal('xIntersectyIntersect');

      selected.path.position.y += 50;
      expect(thingsAreClose(selected, comparison)).to.be.equal('xIntersect');

      selected.path.position.x += 50;
      expect(thingsAreClose(selected, comparison)).to.be.equal('');

      selected.path.position = {
        x: 50,
        y: 1,
      }

      expect(thingsAreClose(selected, comparison)).to.be.equal('yIntersect');

    });
  });

  describe('nearIntersect', () => {
    let allChunks,
        selected,
        delta,
        point,
        grid

    beforeEach('populate the variables', () => {
      // dummy Chunks array
      allChunks = [
        {
          id: 1,
          path: {
            position: {
              x: 40,
              y: 20
            }
          }
        },
        {
          id: 2,
          path: {
            position: {
              x: 50,
              y: 50
            }
          }
        },
      ];
      selected = allChunks[0];
      delta = {
        x: 1,
        y: 0
      };
      point = {
        x: 42,
        y: 20
      };
      grid = 10;
    });

    it('returns newly-aligned coordinates', () => {
      let coords = nearIntersect(selected, allChunks, delta, point, grid);
      expect(coords).to.be.deep.equal([50, 20]);
    });

  });

  describe('constrain', () => {
    it('constrains input to min/max given', () => {
      expect(constrain(20, 40, 300)).to.be.equal(40);
      expect(constrain(20, 10, 30)).to.be.equal(20);
      expect(constrain(20, 1, 10)).to.be.equal(10);
    });
  });

  describe('scale', () => {
    it('scales a number in an output range', () => {
      let scaled = scale(2, 1, 3, 1, 5);
      expect(scaled).to.be.equal(3);
    });
  });

  describe('randomNumberWithinRange', () => {
    it('generates random numbers within a range', () => {
      for(let i = 0; i < 100; i++) {
        let rand = randomNumberWithinRange(5, 10)
        expect(rand).to.be.at.least(5);
        expect(rand).to.be.at.most(10);
      }
    });
  });

  describe('radToDeg', () => {
    it('transforms radians to degrees', () => {
      expect(radToDeg(Math.PI/2)).to.be.equal(90);
      expect(radToDeg(Math.PI)).to.be.equal(180);
    });
  });

  describe('degToRad', () => {
    it('transforms radians to degrees', () => {
      expect(degToRad(180)).to.be.equal(Math.PI);
      expect(degToRad(45)).to.be.equal(Math.PI/4);
    });
  });

})