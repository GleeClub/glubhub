import { GREASE_TOKEN_NAME, GREASE_OLD_TOKEN_NAME } from 'src/utils/constants'

export const getToken = () => localStorage.getItem(GREASE_TOKEN_NAME)

export const setToken = (token: string | null) =>
  token
    ? localStorage.setItem(GREASE_TOKEN_NAME, token)
    : localStorage.removeItem(GREASE_TOKEN_NAME)

export const getOldToken = () => localStorage.getItem(GREASE_OLD_TOKEN_NAME)

export const setOldToken = (oldToken: string | null) =>
  oldToken
    ? localStorage.setItem(GREASE_OLD_TOKEN_NAME, oldToken)
    : localStorage.removeItem(GREASE_OLD_TOKEN_NAME)
