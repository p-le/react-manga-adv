import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
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
    const { onOpenSearch } = this.props;
    return (
      <div>
        <AppBar
          title="Pamu"
          onLeftIconButtonTouchTap={this.handleToogle}
          iconElementRight={<IconButton><ActionSearch /></IconButton>}
          onRightIconButtonTouchTap={onOpenSearch}
        />
        <Drawer open={this.state.open} docked={false} width={200} onRequestChange={(open) => this.setState({ open })}>
          <AppBar title="Pamu" />
          <MenuItem containerElement={<Link to="/">{}</Link>} onTouchTap={this.handleToogle}>
            <FormattedMessage {...messages.home} />
          </MenuItem>
          <MenuItem containerElement={<Link to="/features">{}</Link>} onTouchTap={this.handleToogle}>
            <FormattedMessage {...messages.features} />
          </MenuItem>
          <MenuItem containerElement={<Link to="/manga">{}</Link>} onTouchTap={this.handleToogle}>
            <FormattedMessage {...messages.manga} />
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

Header.propTypes = {
  onOpenSearch: PropTypes.func,
};


export default Header;
