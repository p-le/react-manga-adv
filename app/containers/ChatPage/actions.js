import {
  SEND_MESSAGE, RECEIVE_MESSAGE
} from './constants';

export function sendMessage(message) {
  return {
    type: SEND_MESSAGE,
    message,
  };
}

export function receiveMessage(message) {
  return {
    type: RECEIVE_MESSAGE,
    message,
  };
}