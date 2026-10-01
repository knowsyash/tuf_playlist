import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
        isRegister: { label: "Register", type: "text" }, // hidden field to determine login vs register
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        await connectToDatabase();

        const { email, password, isRegister } = credentials;

        if (isRegister === "true") {
          // Registration flow
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            throw new Error("Email already in use");
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = await User.create({ email, password: hashedPassword, solved: {} });
          return { id: newUser._id.toString(), email: newUser.email };
        } else {
          // Login flow
          const user = await User.findOne({ email });
          if (!user || !user.password) {
            throw new Error("Invalid email or password");
          }
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            throw new Error("Invalid email or password");
          }
          return { id: user._id.toString(), email: user.email };
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
