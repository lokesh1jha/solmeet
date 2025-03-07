import 'next-auth'
import { DefaultUser } from 'next-auth'

declare module 'next-auth' {
    interface User {
        id: string
        email: string
        username: string
        role: string
    }
    interface Session {
        user: {
            id: string
            email: string
            username: string
            role: string
        } & DefaultUser['user']
    }
}