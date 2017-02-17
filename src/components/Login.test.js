import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';

// Material UI stuff
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import {
  Dialog,
  FlatButton,
  RaisedButton,
  ActionGoogle,
  ActionFacebook,
  FloatingActionButton,
  FontIcon,
  TextField,
  MenuItem,
  createShallowWithContext
} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Testing stuff
import chai, {expect} from 'chai';
chai.use(require('chai-enzyme')());
import {shallow, mount} from 'enzyme';
import {spy} from 'sinon';
chai.use(require('sinon-chai'));

// Componenet we're testing
import Login, { PureLogin } from './Login';

const options = {
  context: { store },
  childContextTypes: { store: React.PropTypes.object.isRequired }
};

describe('<Login />', () => {
  let root, pureRoot;

  beforeEach('render the root', () => {
    root = mount(
      <MuiThemeProvider>
          <Login />
      </MuiThemeProvider>, options
    );
  });

  it('renders the Login component', () => {
    expect(root.find(Login)).to.have.length(1);
  });

  it('renders a MUI Dialog', () => {
    expect(root.find(Dialog)).to.have.length(1);
  });

  describe('when submitted', () => {
    pureRoot = shallow(<PureLogin />);
    const login = spy();
    const form = pureRoot.find('form');

    const submitEvent = {
      preventDefault: spy(),
      target: {
        username: {value: 'god@example.com'},
        password: {value: '1234'},
      }
    };

    beforeEach('submit', () => {
      login.reset();
      submitEvent.preventDefault.reset();
      pureRoot.simulate('submit', submitEvent);
    });

    xit('calls props.login with credentials', () => {
      expect(login).to.have.been.calledWith(
        submitEvent.target.username.value,
        submitEvent.target.password.value
      );
    });

    xit('calls preventDefault', () => {
      expect(submitEvent.preventDefault).to.have.been.called();
    });
  });
});
