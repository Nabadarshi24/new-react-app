export type TypeLogin = {
  userName: string;
  password: string;
};

export type TypeSignUp = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
};

export type TypeUserData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  isVerified: boolean;
  isDeleted: boolean;
}

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