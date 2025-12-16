"use client";

import { JSX, useEffect } from "react";
import { useRouter } from "next/router";

interface Props {
  children: JSX.Element;
  role?: "admin" | "user";
}

const ProtectedRoute = ({ children, role }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      router.replace("/signin");
      return;
    }

    const parsedUser = JSON.parse(user);

    if (role && parsedUser.role !== role) {
      router.replace("/dashboard");
    }
  }, [role, router]);

  return children;
};

export default ProtectedRoute;