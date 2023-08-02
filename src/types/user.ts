export interface SignupState {
  name: string;
  email: string;
  password: string;
}

export interface LoginState {
  email: string;
  password: string;
}


export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: any;

}
