import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';

import { blue300, indigo900, orange200, deepOrange300, pink400, purple500 } from 'material-ui/styles/colors';

import { makeSelectIsOpenSearch } from 'containers/App/selectors';
import * as ChatPageActions from './actions';
import { makeSelectMessages } from './selectors';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

export class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.state = {
      message: '',
      open: false,
    };
  }

  componentDidMount() {
    const { receiveMessage } = this.props;
    const webSocket = new WebSocket('ws://localhost:10000/chat');

    webSocket.onopen = (event) => {
      this.setState({
        webSocket
      });
      webSocket.send(JSON.stringify({
        type: 'connect',
        text: ''
      }));
    }

    webSocket.onmessage = (event) => {
      receiveMessage(event.data);
    }

    webSocket.onclose = (event) => {

    }
  }
  handleSendMessage(event) {
    const { sendMessage } = this.props;
    if (event.key == 'Enter') {
      this.state.webSocket.send(this.state.message);
      this.setState({
        message: '',
      });
    }
  }
  handleMessage(event) {
    this.setState({
      message: event.target.value,
    });
  }
  handleOpen() {
    this.setState({
      open: true
    })
  }
  render() {
    const { messages } = this.props;
    return (
      <Page>
        <Helmet
          title="Chat Page"
          meta={[
            { name: 'description', content: 'Feature page of React.js Boilerplate application' },
          ]}
        />
        <TextField
          hintText="Message"
          multiLine
          fullWidth
          rows={2}
          rowsMax={4}
          value={this.state.message}
          onChange={this.handleMessage}
          onKeyDown={this.handleSendMessage}
        />
        <List>
          {
            messages.map((message, index) => (
              <ListItem
                key={index}
                disabled
                leftAvatar={
                  <Avatar
                    icon={<FontIcon className="muidocs-icon-communication-voicemail" />}
                    color={blue300}
                    backgroundColor={indigo900}
                    size={30}
                  />
                }
              >
                {message}
              </ListItem>
            ))
          }
        </List>
        <FloatingActionButton
          mini style={{ position: 'fixed', bottom: 10, right: 10 }}
          onTouchTap={this.handleOpen}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="New Chat Room"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField hintText="Room name" />
          Create new chat room and invite your friend !
        </Dialog>
        
      </Page>
    );
  }
}

ChatPage.propTypes = {
  messages: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  messages: makeSelectMessages()
});

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(ChatPageActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(ChatPage);
