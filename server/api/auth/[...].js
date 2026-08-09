/* eslint-disable @typescript-eslint/no-unused-vars */
import { NuxtAuthHandler } from "#auth";
import Credentials from "next-auth/providers/credentials";

const config = useRuntimeConfig();

/**
 * Kirim permintaan login ke BE untuk mendapatkan token
 * @param email
 * @param password
 * @returns
 */
const login = async (email, password) => {
  if (!email || !password) return false;

  try {
    const data = await $fetch("/api/auth/login", {
      baseURL: config.public.apiBaseUrl,
      method: "POST",
      body: {
        email,
        password,
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: config.keySecret,

  providers: [
    // @ts-expect-error you need to use .default here for it to work during SSR
    Credentials.default({
      name: "Credentials",
      async authorize(credentials) {
        if (!credentials) return;

        const data = await login(credentials.email, credentials.password);

        if (data.success) {
          return {
            accessToken: data.token,
            id: data.user._id,
            email: data.user.email,
          };
        }

        const message = data?.message || "Email atau password salah";

        throw new Error(message);
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      return true;
    },

    /* on redirect to another url */
    async redirect({ url, baseUrl }) {
      if (url) return url;

      return baseUrl;
    },

    async jwt({ token, user, account }) {
      // Credentials login — user object langsung dari authorize()
      if (user && account?.provider === "credentials") {
        token = user;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },

  pages: {
    signIn: "/masuk",
  },
});
