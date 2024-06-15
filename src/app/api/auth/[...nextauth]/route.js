import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import { fetchUsers } from "@/services/UsersServices";
import { redirect } from "next/dist/server/api-utils";
// export { GET, POST } from "@/auth"
import bcrypt from "bcryptjs"
import { fetchUserMailAndPass } from "@/services/UsersServices";
import Credentials from "next-auth/providers/credentials"

const searchUser = async email => {
  const response = await fetchUsers()
  const user = response.users.filter(user => user.email === email)
  return user
}
// admin, alumno, profesional
const ROL = 'admin'

const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        // console.log('PROFILE', profile);
        return ({
          id: profile.sub,
          name: `${profile.name}`,
          apellido: `${profile.family_name}`,
          email: profile.email,
          // role: profile.role || 'user',
          image: profile.picture
        })
      }
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {label: "email", type: "email", placeholder: "jsmith" },
        password: { label: "password", type: "password" }
      },
      authorize: async (credentials) => {
        let user = null
        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)
        const pwHash = credentials.password

        let body = {
          email: credentials.email,
          contrasena: pwHash
        }
        // logic to verify if user exists
        // user = await fetchUserMailAndPass(body)
        user = {
          email: 'estefania.osses.v@gmail.com'
        }
        console.log('USER', user);
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }

        // return user object with the their profile data
        return user
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, credentials }) {
      console.log('CREDENTIALS', credentials);
      try {
        const user = [{email: 'estefania.osses.v@gmail.com'}]
        // const user = await searchUser(profile.email)
        // console.log('USER', user);
        if (user.length === 0) {
          // Si el usuario no tiene un correo electrónico, significa que la autenticación ha fallado.
          throw new Error('No se pudo acceder. Correo no autorizado.');
        }

        if (account.provider === "google") {
          return profile.email_verified && profile.email.endsWith("@gmail.com")
        }

        return true // Do different verification for other providers that don't have `email_verified`
      } catch (error) {
        console.log('ERRRRRRRRR', error);
      }
      return true
    },
    async session({ session, user, token }) {
      // const userS = await searchUser(profile.email)
      // console.log('USER', user);
      if (token /* && token.user */) {
        session.user = token; // Asegúrate de que `token.user` contenga las propiedades extendidas
        session.user.rol = ROL;
        console.log('SESSION', session);
      }
      return session;
    },
  }
})

export { handler as GET, handler as POST }