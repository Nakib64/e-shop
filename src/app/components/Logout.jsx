"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@mui/material";

export default function LogoutButton() {
  const { data: session } = useSession();

  if (!session) return null; // hide button if not logged in

  return (
    <Button
      variant="outlined"
      color="error"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      Logout
    </Button>
  );
}
