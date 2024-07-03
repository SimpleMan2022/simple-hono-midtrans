export type User = {
    id: number,
    username: string
    email: string
    phone: string
}

export type UserCreateInput = {
    email: string
    username: string
    phone: string
    password: string
}

export type UserLoginRequest = {
    username: string
    password: string
}

export type UserLoginResponse = {
    access_token: string
    refresh_token?: string
}