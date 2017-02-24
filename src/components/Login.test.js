import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store';
import { createStore } from 'redux';
import login from '../redux/login';

// Material UI stuff
import {
  Dialog,
  FlatButton,
  TextField
} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme();
import injectTapEventPlugin from 'react-tap-event-plugin';


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
  let root, dialog, node, submit;
  const loginSpy = spy();
  injectTapEventPlugin();

  let testStore;

  beforeEach('render the root', () => {
    testStore = createStore(login);
    root = mount(
      <MuiThemeProvider>
        <Provider store={ store }>
          <Login login={loginSpy} />
        </Provider>
      </MuiThemeProvider>
    );
  });

  it('renders the Login component', () => {
    expect(root.find('div')).to.have.length(1);
  });

  it('renders a MUI Dialog', () => {
    expect(root.find(Dialog)).to.have.length(1);
  });

  it('has a form', () => {
    node = root.find(Dialog).node.renderLayer();
    dialog = shallow(
      <MuiThemeProvider>
        <Provider store={ testStore }>
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
      // let children = dialog.find('[className="dialog"]').children();
      // console.log('THE CHILDREN', children);
      // let button = dialog.find(FlatButton);
      submit = shallow(
        <MuiThemeProvider>
          {dialog.node.props.children.props.actions[1]}
        </MuiThemeProvider>
      );
      // console.log('THE DIALOG ', dialog.node.props.children.props.actions);
      // console.log('THE SUBMIT', submit);
      loginSpy.reset();
      submitEvent.preventDefault.reset();
      submit.simulate('click', submitEvent);
    });

    // it('has two text fields', () => {
    //   expect(dialog.find(TextField)).to.have.length(2);
    // });

    it('calls props.loginSpy with credentials', () => {
      console.log('LOGIN', Object.keys(loginSpy));
      expect(loginSpy.called).to.equal(true);
      // expect(loginSpy).to.have.been.calledWith(
      //   submitEvent.target.username.value,
      //   submitEvent.target.password.value
      // );
    });

    it('calls preventDefault', () => {
      expect(submitEvent.preventDefault.called).to.equal(true);
    });
  });
});
