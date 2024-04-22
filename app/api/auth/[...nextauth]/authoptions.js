
import { withAuth } from "next-auth/middleware"
import CredentialsProvider from "next-auth/providers/credentials"

import axios from "axios"



const authOptions = {

  providers: [
    CredentialsProvider({

      name: 'Credentials',

      credentials: {
        username: { label: "Username", type: "text", placeholder: "user" },
        // role: { label: "role", type: "text", placeholder: "role" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.username || !credentials.password)
          return null
        const users = await axios.get(`http://192.168.1.4:5000/users/getuser/${credentials.username}`)

        const user = users.data.find((item) => item.name === credentials.username)
        if (user?.password === credentials.password) {
         
          return user

        }
        return null
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user){
        token.name = user.name
       token.role = user.role
       
      }  
      return token
    },
    session({ session, token }) {
      session.user.name = token.name
      session.user.role = token.role
      return session
    }
  },



  pages: {
    signIn: "/auth/signIn",
    signOut: "/auth/signOut"
  },
  secret: process.env.NEXTAUTH_SECRET
  
}

export { authOptions }