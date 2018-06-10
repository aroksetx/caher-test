
const initialAuthState = { isLoggedIn: false };

export const authState = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'Login':
      console.log('I am loging')
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}