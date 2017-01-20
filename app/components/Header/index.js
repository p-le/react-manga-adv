import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleToogle = this.handleToogle.bind(this);
    this.state = {
      open: false,
    };
  }
  handleToogle() {
    this.setState({ open: !this.state.open });
  }
  render() {
    return (
      <div>
        <AppBar
          title="Pamu"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.handleToogle}
        />
        <Drawer open={this.state.open} docked={false} width={200} onRequestChange={(open) => this.setState({ open })}>
          <AppBar title="Pamu" />
          <MenuItem containerElement={<Link to="/">{}</Link>}>
            <FormattedMessage {...messages.home} />
          </MenuItem>
          <MenuItem containerElement={<Link to="/features">{}</Link>}>
            <FormattedMessage {...messages.features} />
          </MenuItem>
          <MenuItem containerElement={<Link to="/manga">{}</Link>}>
            <FormattedMessage {...messages.manga} />
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default Header;
