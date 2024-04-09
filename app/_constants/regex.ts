export const REGEX = {
  EMAIL:
    /^[a-zA-Z0-9.!#$%&â€™*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  ONLY_NUMBER: /^\d+$/,
  ONLY_STRING: /^[A-Za-z]+$/,
} as const;
