export const API_ROUTES = {
  AUTH: {
    REGISTER: "/v1/auth/register",
    LOGIN: "/v1/auth/login",
    VERIFY_OTP: "/v1/auth/verify-otp",
    RESEND_OTP: "/v1/auth/resend-otp",
    FORGOT_PASSWORD: "/v1/auth/forgot-password",
    RESET_PASSWORD: "/v1/auth/reset-password",
  },
  VERIFICATION: {
    OCR: "/v1/verification/ocr",
    FACE_RECOGNITION: "/v1/verification/face-recognition",
  },
  DOCUMENT: {
    UPLOAD: "/v1/document/upload",
    PREVIEW: (id: string, type?: string) =>
      type
        ? `/v1/document/preview/${id}?type=${type}`
        : `/v1/document/preview/${id}`,
    DOWNLOAD: (id: string, type: string) =>
      `/v1/document/download/${id}?type=${type}`,
    SIGN: "/v1/document/sign",
    LIST: "/v1/document/list",
    VALIDITY: (id: string) => `/v1/document/validity/${id}`,
  },
  SIGN: {
    UPLOAD: "/v1/sign/upload",
    SPECIMEN: "/v1/sign/specimen",
  },
  USER: {
    PROFILE: "/v1/user/profile",
  },
  HEALTHCHECK: "/healthcheck",
} as const;

export const QUERY_KEYS = {
  AUTH: {
    VERIFY_OTP: ["auth", "verify-otp"] as const,
    RESEND_OTP: ["auth", "resend-otp"] as const,
  },
  DOCUMENT: {
    LIST: ["document", "list"] as const,
    PREVIEW: (id: string, type?: string) =>
      ["document", "preview", id, type].filter(Boolean) as readonly string[],
    VALIDITY: (id: string) => ["document", "validity", id] as const,
  },
  SIGN: {
    SPECIMEN: ["sign", "specimen"] as const,
  },
  USER: {
    PROFILE: ["user", "profile"] as const,
  },
  HEALTHCHECK: ["healthcheck"] as const,
} as const;
