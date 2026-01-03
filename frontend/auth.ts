import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import { Role } from "@prisma/client";
import { getSecretaryById, getTeacherById } from "./hooks/user";
import AuthConfig from "./auth.config";

export type ExtendedUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  institutionId?: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser & DefaultSession["user"];
  }

  interface User extends ExtendedUser { } // Safe now
}

declare module "next-auth/jwt" {
  interface JWT extends ExtendedUser { } // For JWT token (client + server consistency)
}
export const {
  auth,
  signOut,
  signIn,
  handlers: { GET, POST },
} = NextAuth({
  pages: {
    signIn: "/guest/Login",
    error: "/guest/error",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user) return false;
      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      if (token.institutionId && session.user) {
        session.user.institutionId = token.institutionId;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.institutionId = user.institutionId;
        return token;
      }
      if (!token.sub) return token;

      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      let existingUser;
      switch (token.role) {
        case "TEACHER": {
          existingUser = await getTeacherById(token.sub);
          break;
        }
        case "ADMIN": {
          existingUser = {
            id: "admin",
            name: "Admin",
            email: process.env.ADMIN_EMAIL!,
            role: "ADMIN" as const,
          };
          break;
        }

        case "SECRETARY": {
          existingUser = await getSecretaryById(token.sub);
          break;
        }

        default: {
          console.warn("Invalid role found in token:", token.role);
          existingUser = null;
          break;
        }
      }

      if (!existingUser) return token;

      token.institutionId = existingUser.institutionId;
      // token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },

  providers: [...AuthConfig.providers],
  secret: process.env.NEXT_AUTH_SECRET,
});

// export { handler as GET, handler as POST };
