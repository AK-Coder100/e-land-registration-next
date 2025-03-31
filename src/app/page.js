"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  let hasRedirected = false;

  useEffect(() => {
    if (!hasRedirected) {
      hasRedirected = true; // Ensure the redirect only happens once
      router.replace("/auth");
    }
  }, []);

  return (
    <div></div>
  );
}
