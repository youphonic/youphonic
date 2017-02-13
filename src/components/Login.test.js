import React from 'react';
import ReactDOM from 'react-dom';
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
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme();

// Testing stuff
import chai, {expect} from 'chai';
chai.use(require('chai-enzyme')());
import {shallow, mount, render} from 'enzyme';
import {spy} from 'sinon';
chai.use(require('sinon-chai'));

// Componenet we're testing
import Login, { PureLogin } from './Login';

const options = {
  context: { store },
  childContextTypes: { muiTheme: muiTheme },
  getChildContext() {
    return {muiTheme: muiTheme};
  }
};

describe.only('<Login />', () => {
  let root, dialog, node;
  const login = spy();

  beforeEach('render the root', () => {
    root = mount(
      <MuiThemeProvider>
        <Provider store={ store }>
          <Login login={login} />
        </Provider>
      </MuiThemeProvider>
    );
    // console.log('ROOT', root.node.props.children.props.children);
  });

  it('renders the Login component', () => {
    expect(root.find('div')).to.have.length(1);
  });

  it('renders a MUI Dialog', () => {
    // console.log(root.find(Dialog));
    expect(root.find(Dialog)).to.have.length(1);
  });

  it('has a form', () => {
    node = root.find(Dialog).node.renderLayer();
    dialog = shallow(
      <MuiThemeProvider>
        <Provider store={ store }>
          {node}
        </Provider>
      </MuiThemeProvider>
    );

    expect(dialog.find('form')).to.have.length(1);
  });

  describe('when submitted', () => {

    const submitEvent = {
      preventDefault: spy(),
      target: {
        username: {value: 'god@example.com'},
        password: {value: '1234'},
      }
    };

    beforeEach('submit', () => {
      let form = dialog.find('[className="dialog"]');
      console.log('THE FORM', form);
      login.reset();
      submitEvent.preventDefault.reset();
      dialog.simulate('submit', submitEvent);
    });

    it('calls props.login with credentials', () => {
      expect(login).to.have.been.calledWith(
        submitEvent.target.username.value,
        submitEvent.target.password.value
      );
    });

    it('calls preventDefault', () => {
      expect(submitEvent.preventDefault).to.have.been.called();
    });
  });
});
