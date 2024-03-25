export interface LoginPayload {
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
