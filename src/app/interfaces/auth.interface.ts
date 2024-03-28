export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  data:{
      email: string;
      username: string;
      _id: string;
      role: string;
  },
  accessToken: string;
}
export interface RegisterResponse {
  status: string;
  message?: string;
}
