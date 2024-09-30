"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";

export default function Template({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    AOS?.init({ duration: 1200, debounceDelay: 50, offset: 150 });
  }, []);

  return <>{children}</>;
}
