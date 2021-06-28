export const initialState = {
  avatar: '',
  favorite: [],
  appointments: [],
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'setAvatar':
      return {...state, avatar: action.payload.avatar};
      // eslint-disable-next-line no-unreachable
      break;
    default:
      return state;
  }
};
