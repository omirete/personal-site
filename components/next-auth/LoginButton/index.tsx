"use client";

import { useSession, signIn, signOut } from "next-auth/react";
const LoginButton: React.FC = () => {
    const { data: session } = useSession();
    if (session) {
        return (
            <button onClick={() => signOut()} className="btn btn-secondary">
                Sign out
            </button>
        );
    }
    return (
        <button onClick={() => signIn()} className="btn btn-primary">
            Sign in
        </button>
    );
};

export default LoginButton;
