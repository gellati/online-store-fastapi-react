
const tokenKey = 'user'

export const getToken = () => {
    const tokenString = localStorage.getItem(tokenKey)
    return tokenString || null
}

export const saveToken = (token: string) => {
    localStorage.setItem(tokenKey, token)
}

export const removeToken = (): void => {
    localStorage.removeItem(tokenKey)
}
