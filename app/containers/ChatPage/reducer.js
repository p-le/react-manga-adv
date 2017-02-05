import { fromJS } from 'immutable';
import { SEND_MESSAGE, RECEIVE_MESSAGE } from './constants';

const initialState = fromJS({
  messages: [],
});

function chatReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE:
    case RECEIVE_MESSAGE:
      return state.update('messages', messages => messages.concat(action.message));
    default: return state;
  }
}

export default chatReducer;
