import { ADD_CHUNK } from '../constants'

export const addChunk = (chunk) => {
  return {
    type: ADD_CHUNK,
    chunk
  }
}