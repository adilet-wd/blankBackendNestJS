export interface TokenPayload {
  username: string;
  role: string;
  type: string;
  iat?: number;
  exp?: number;
}