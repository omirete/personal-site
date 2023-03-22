// From: https://github.com/nextauthjs/next-auth/pull/5718
"use client";
// This module exists for the sole purpose of cloning SessionProvider & adding the compiler directive above

import React from "react";
import { SessionProvider } from "next-auth/react";

const ClientSessionProvider: typeof SessionProvider = (props) => {
    return <SessionProvider {...props} />;
};

export default ClientSessionProvider;
