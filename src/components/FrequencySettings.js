import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';


const frequencies = [
  'C', 'C#', 'D', 'D#', 'E', 'E#', 'F', 'F#'
];

/**
 * FuzzyFilter: caseInsensitiveFilter
 */
const FrequencySettings = () => (
  <div>
    <AutoComplete
      floatingLabelText="Enter a note for this shape"
      filter={AutoComplete.caseInsensitiveFilter}
      dataSource={colors}
    />
  </div>
);

export default FrequencySettings;
