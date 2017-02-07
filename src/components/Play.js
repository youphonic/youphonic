import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const Play = ({play}) => (
  <div>
    <Paper style={style} zDepth={1} rounded={false}>
      {play.title}
    </Paper>
  </div>
);

export default Play;
