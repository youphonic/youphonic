import React from 'react';
import { AutoComplete } from 'material-ui';

const frequencies = [
  'C1', 'C#1', 'D1', 'Db1', 'D#1', 'E1', 'Eb1', 'F1', 'F#1', 'G1', 'Gb1', 'G#1', 'A1', 'Ab1', 'A#1', 'B1', 'Bb1',
  'C2', 'C#2', 'D2', 'Db2', 'D#2', 'E2', 'Eb2', 'F2', 'F#2', 'G2', 'Gb2', 'G#2', 'A2', 'Ab2', 'A#2', 'B2', 'Bb2',
  'C3', 'C#3', 'D3', 'Db3', 'D#3', 'E3', 'Eb3', 'F3', 'F#3', 'G3', 'Gb3', 'G#3', 'A3', 'Ab3', 'A#3', 'B3', 'Bb3',
  'C4', 'C#4', 'D4', 'Db4', 'D#4', 'E4', 'Eb4', 'F4', 'F#4', 'G4', 'Gb4', 'G#4', 'A4', 'Ab4', 'A#4', 'B4', 'Bb4',
  'C5', 'C#5', 'D5', 'Db5', 'D#5', 'E5', 'Eb5', 'F5', 'F#5', 'G5', 'Gb5', 'G#5', 'A5', 'Ab5', 'A#5', 'B5', 'Bb5',
  'C6', 'C#6', 'D6', 'Db6', 'D#6', 'E6', 'Eb6', 'F6', 'F#6', 'G6', 'Gb6', 'G#6', 'A6', 'Ab6', 'A#6', 'B6', 'Bb6',
  'C7', 'C#7', 'D7', 'Db7', 'D#7', 'E7', 'Eb7', 'F7', 'F#7', 'G7', 'Gb7', 'G#7', 'A7', 'Ab7', 'A#7', 'B7', 'Bb7'
];

const AutoCompleteNotes = ({
  frequency,
  changeFrequency,
  handleFrequencyEnterKey
}) => {
  return (
    <div>
      <AutoComplete
        searchText={frequency}
        dataSource={frequencies}
        onUpdateInput={changeFrequency}
        onKeyDown={handleFrequencyEnterKey}
        filter={AutoComplete.caseInsensitiveFilter}
        floatingLabelText="Enter note: C1, C#1, Db1, etc"
      />
    </div>
  );
};

export default AutoCompleteNotes;
