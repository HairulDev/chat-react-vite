import {
  FETCH_MESSAGE,
  FETCH_MESSAGE_BY,
  CREATE,
  DELETE,
  UPDATE,
  AUTH,
  FETCH_ALL,
  FETCH_USER,
  CLEAR_MESSAGE,
  FETCH_GROUP,
} from '../../constants/actionTypes';

const userReducer = (state = {
  isLoading: true,
  messages: [],
  messageBy: [],
  users: [],
  user: {},
  groups: [],
}, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));

    case FETCH_USER:
      return { ...state, user: action.payload };

    case FETCH_ALL:
      return { ...state, users: action.payload };

    case FETCH_MESSAGE:
      return { ...state, messages: action.payload };

    case FETCH_MESSAGE_BY:
      return { ...state, messageBy: action.payload };

    case CLEAR_MESSAGE:
      return { ...state, messageBy: [], };

    case CREATE:
      return { ...state, messages: [...state.messages, action.payload] };

    case UPDATE:
      return { ...state, messages: state.messages.map((message) => (message.id === action.payload.id ? action.payload : message)) };

    case DELETE:
      return { ...state, messages: state.messages.filter((message) => message.id !== action.payload.id) };

    case FETCH_GROUP:
      return { ...state, groups: action.payload };

    default:
      return state;
  }
};
export default userReducer;
