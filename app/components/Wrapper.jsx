'use strict';

import React from 'react';
import alt from '../alt';
import AltContainer from 'alt/AltContainer';
import App from './App';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';

import theme from '../style/themes/default-theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';

const themeManager = new ThemeManager();
themeManager.setTheme(theme);

// webpack
require('../style/app.less');

class Wrapper extends React.Component {
  getChildContext() {
    return Object.assign(
      {}, this.props.initData.ctx, { muiTheme: themeManager.getCurrentTheme() }
    );
  }

  componentWillMount() {
    alt.bootstrap(JSON.stringify(this.props.initData.state));

    // force state update this render cycle
    this.setState(AppStore.getState());
  }

  render() {
    return (
      <AltContainer store={AppStore} actions={AppActions} >
        <App />
      </AltContainer>
    );
  }
}

Wrapper.childContextTypes = {
  tag: React.PropTypes.string.isRequired,
  loggedIn: React.PropTypes.bool.isRequired,
  muiTheme: React.PropTypes.object,
  repoUrl: React.PropTypes.string.isRequired
};

Wrapper.PropTypes = {
  initData: React.PropTypes.object.isRequired
};

export default Wrapper;
