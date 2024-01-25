declare namespace Express {
  interface userPayload {
    expiresIn: string;
    userId: string;
    iat: number;
  }

  interface Request {
    payload: userPayload;
  }
}
