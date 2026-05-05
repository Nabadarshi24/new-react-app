export type TypeLogin = {
  email: string;
  password: string;
};

export type TypeSignUp = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export type TypeLoginUserData = {
  userId: string;
  userLabel: string;
  roleLabel: string;
  email: string;
  accessToken: string;
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
};

export type TypeRegistrationPayload = {
  name: string;
  email: string;
  password: string;
  role: string;
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

export type TypeLoginResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
};

export type TypeSignInOtpResponse = {
  isForcePasswordChange: boolean;
  authData: TypeAuthData;
};

export type TypeUserProfile = {
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  // password: string;
  userRole: string;
  isVerified?: boolean;
  isDeleted?: boolean;
};
