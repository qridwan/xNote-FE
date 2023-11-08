export interface ILoginBody {
  password: string;
  email: string;
}

export interface IAuth {
  accessToken: string | undefined;
  user:
    | {
        email: string;
        username: string;
        id: string;
      }
    | undefined;
}
