import { createSelector } from 'reselect';

const selectChat = (state) => state.get('chat');

const makeSelectMessages = () => createSelector(
  selectChat,
  (chatState) => chatState.get('messages').toJS()
);

export {
  makeSelectMessages,
};
