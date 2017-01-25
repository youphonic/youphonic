import { connect } from 'react-redux';

import App from '../components/App';

const mapStateToProps = ({ rename }) => ({ rename });

export default connect(mapStateToProps)(App);
