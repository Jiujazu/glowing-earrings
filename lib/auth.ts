import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

// Allowed GitHub usernames for editing (comma-separated in env)
const allowedUsers = (process.env.AUTH_ALLOWED_USERS || "")
  .split(",")
  .map((u) => u.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ profile }) {
      // If no allowed users configured, allow all GitHub users
      if (allowedUsers.length === 0) return true;
      // Only allow specific GitHub usernames
      const username = (profile?.login as string || "").toLowerCase();
      return allowedUsers.includes(username);
    },
    async session({ session, token }) {
      // Add GitHub username to session
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
