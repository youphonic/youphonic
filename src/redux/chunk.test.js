import chai from 'chai';
const expect = chai.expect;
import reducer, { selectChunk, updateChunk } from './Chunk';
import { SELECT_CHUNK, UPDATE_SELECTED_CHUNK } from '../constants';


describe('chunk redux', () => {
  const testChunk = {id: 1};

  describe('actions', () => {
    it('create correct select chunk action', () => {
      const selectedTestChunk = selectChunk(testChunk);
      expect(selectedTestChunk).to.deep.equal({
        type: SELECT_CHUNK,
        chunk: testChunk
      });
    });

    it('create correct update chunk action', () => {
      const updatedTestChunk = updateChunk(testChunk);
      expect(updatedTestChunk).to.deep.equal({
        type: UPDATE_SELECTED_CHUNK,
        chunkUpdates: testChunk
      });
    });
  });

  describe('reducer', () => {
    const state = {};

    it('defaults state to an empty OBJECT', () => {
      // dummy data
      const action = {type: 'any', payload: {}};
      let newState = reducer(state, action);
      expect(newState).to.be.deep.equal({});
    });

    it('adds a selected chunk to the state', () => {
      const action = {
        type: SELECT_CHUNK,
        chunk: {
          id: 'I am a selected Chunk'
        }
      };
      let newState = reducer(state, action);
      expect(newState).to.deep.equal({
        id: 'I am a selected Chunk'
      });

    });

    it('updates the selected chunk on state', () => {
      const oldState = {
        id: 1,
        xpos: 3
      }
      const action = {
        type: UPDATE_SELECTED_CHUNK,
        chunkUpdates: {
          xpos: 5
        }
      };
      let newState = reducer(oldState, action);
      expect(newState).to.deep.equal({
        id: 1,
        xpos: 5
      });

    });
  });

});
