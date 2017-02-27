import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';

// Setting up Chai, Enzyme, Sinon
import chai, {expect} from 'chai';
chai.use(require('chai-enzyme')());
import {shallow, mount} from 'enzyme';
import {spy} from 'sinon';
chai.use(require('sinon-chai'));

// Material UI setup
import {
  Dialog,
  TextField
} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Component we're testing:
// Login is used to fully mount the connected component,
// PureLogin is used to shallow render just the
// component itself, not connected to the store.
import Login, { PureLogin } from './Login';

describe('<Login />', () => {
  let connectedRoot, dialog, node, pureRoot;
  injectTapEventPlugin();

  beforeEach('render the connectedRoot and inner dialog', () => {
    // Mount the full component for access to
    // the Dialog's renderLayer function
    connectedRoot = mount(
      <MuiThemeProvider>
        <Provider store={ store }>
          <Login />
        </Provider>
      </MuiThemeProvider>
    );

    // Render the DialogInline component
    node = connectedRoot.find(Dialog).node.renderLayer();

    // Shallow mount the DialogInline component
    dialog = shallow(
      <MuiThemeProvider>
        <Provider store={ store }>
          {node}
        </Provider>
      </MuiThemeProvider>
    );
  });

  it('renders the Login component', () => {
    expect(connectedRoot.find(Login)).to.have.length(1);
  });

  it('renders a MUI Dialog', () => {
    expect(connectedRoot.find(Dialog)).to.have.length(1);
  });

  it('has a login form', () => {
    expect(dialog.find('form')).to.have.length(1);
  });

  it('has two text fields', () => {
    expect(dialog.find(TextField)).to.have.length(2);
  });

  describe('when username and password are entered', () => {
    const loginSpy = spy();
    const submitEvent = {
      preventDefault: spy()
    };
    before('', () => {
      pureRoot = shallow(
        <PureLogin
          open={true}
          login={loginSpy}
          closeLogin={() => {}}
          openLoginAlert={() => {}} />
      );
    });

    it('changes username on state', () => {
      const userNameField = pureRoot.find('[name="userName"]');
      userNameField.simulate('change', {
        target: { value: 'god@example.com'}
      });

      expect(pureRoot.state('userName')).to.equal('god@example.com');
    });

    it('changes password on state', () => {
      const passwordField = pureRoot.find('[name="password"]');
      passwordField.simulate('change', {
        target: { value: '1234' }
      });

      expect(pureRoot.state('password')).to.equal('1234');
    });

    it('calls props.login on submit', () => {
      let submitButton = shallow(
        <MuiThemeProvider>
          {pureRoot.node.props.children.props.actions[1]}
        </MuiThemeProvider>
      );
      submitButton.simulate('click', submitEvent);
      expect(loginSpy).to.have.been.calledWith(
        'god@example.com',
        '1234'
      );
    });

    it('calls preventDefault', () => {
     expect(submitEvent.preventDefault).to.have.been.called; // eslint-disable-line no-unused-expressions
   });
  });
});
