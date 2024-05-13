import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Extending the built-in session/user types to include the properties used
   * in your application, such as the GitHub username.
   */
  interface Session {
    user: {
      username?: string; // Add the username property
      name?: string;
      email?: string;
      image?: string;
    } & DefaultSession["user"];
  }
}
