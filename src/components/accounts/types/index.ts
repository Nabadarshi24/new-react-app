export type TypeLogin = {
  username: string;
  password: string;
};

export type TypeSignInOtpPayload = {
  authKey: string;
  password: string;
};

export type TypeAuthData = {
  userId: string;
  roleId: string;
  userLabel: string;
  companyId: string;
  companyName: string;
  accessToken: string;
  accessTokenExpiresUtc: Date
  refreshToken: string;
  tempAuthKey: string;
  deviceAffinityToken: string;
  refreshTokenExpiresUtc: Date
};

export type TypeSignInResponse = {
  isForcePasswordChange: boolean;
  isTwoFactorAuthRequired: boolean;
  isTwoFactorAuthEnabled: boolean;
  otpSendMethod: string;
  otpSentTo: string;
  twoFactorAuthInstructions: string;
  trustThisDeviceLabel: string;
  authData: TypeAuthData;
};

export type TypeSignInOtpResponse = {
  isForcePasswordChange: boolean;
  authData: TypeAuthData;
}