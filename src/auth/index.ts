interface AuthProvider {
  isAuthenticated: boolean;
  username: null | string;
  signin(username: string): Promise<void>;
  signout(): Promise<void>;
}

// this should be replaced with a real auth provider that uses a token or session
// this is just for demo purposes
export const fakeAuthProvider: AuthProvider = {
  isAuthenticated: false,
  username: null,
  async signin(username: string) {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    fakeAuthProvider.isAuthenticated = true;
    fakeAuthProvider.username = username;
  },
  async signout() {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    fakeAuthProvider.isAuthenticated = false;
    fakeAuthProvider.username = "";
  },
};