import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const userEmail = user.email;
            const authorized_emails = process.env.AUTHORIZED_EMAILS?.split(",");
            if (
                authorized_emails &&
                userEmail &&
                authorized_emails.includes(userEmail)
            ) {
                // Allowed to sign in.
                return true;
            } else {
                // Return false to display a default error message
                // return false;
                // Or you can return a URL to redirect to:
                return "/unauthorized";
            }
        },
    },
};
