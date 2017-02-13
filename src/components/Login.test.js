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

  beforeEach('render the root', () => {
    root = mount(
      <MuiThemeProvider>
        <Provider store={ store }>
          <Login />
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
    // console.log('LOGIN', <Login />);
    // console.log('NODE', node);
    dialog = mount(
      <MuiThemeProvider>
        <Provider store={ store }>
          {node}
        </Provider>
      </MuiThemeProvider>
    );
    console.log(dialog.node.props.children.props.children.props.children);
    // console.log(mount(
    //   <MuiThemeProvider>
    //     <Provider store={ store }>
    //       {node}
    //     </Provider>
    //   </MuiThemeProvider>
    // ).debug());

    expect(dialog.find(Provider).find(Login)).to.have.length(1);
  });

  describe('when submitted', () => {
    const login = spy();

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
      dialog.simulate('submit', submitEvent);
    });

    // TODO: complete login tests
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
