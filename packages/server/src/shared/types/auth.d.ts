export interface LoginUser {
  /** ユーザーのID */
  id: number;
  /** ユーザー名 */
  name: string;
}

export interface JwtPayload extends LoginUser {
  /** 作成日時 */
  iat: number;
  /** 有効期限 */
  exp: number;
}
