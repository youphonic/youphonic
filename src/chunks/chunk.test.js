import chai from 'chai'
const expect = chai.expect;
import Chunk from './Chunk';


describe('Chunk constructor', () => {


  describe('creates a chunk shape', () => {
    it('chunks has properties xyz', () => {
      const newChunk = {id: 1}
      const addChunkAction = addChunk(newChunk)
      expect(addChunkAction).to.be.deep.equal({
        type: 'ADD_CHUNK',
        chunk: newChunk
      })
    })
  })

  describe('reducer', () => {
    it('defaults state to an empty array', () => {
      // dummy data
      const state = [];
      const action = {any: 'a'}
      let newState = reducer(state, action)
      expect(newState).to.be.deep.equal([])
    })

    it('adds a chunk to the state', () => {
      const state = [];
      const action = {
        type: 'ADD_CHUNK',
        chunk: {
          id: 'I am a new Chunk'
        }
      }
      let newState = reducer(state, action);
      expect(newState).to.be.deep.equal([action.chunk])

    })
  })

})
