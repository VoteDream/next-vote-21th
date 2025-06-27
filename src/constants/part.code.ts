export const PART_CODE = {
  FRONTEND: "FRONTEND",
  BACKEND: "BACKEND",
  NONE: "NONE",
} as const;

export type PART_CODE_TYPE = keyof typeof PART_CODE;
