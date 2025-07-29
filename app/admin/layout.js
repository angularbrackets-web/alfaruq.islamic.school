'use client';

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { usePathname, useRouter } from "next/navigation";
import AdminHeader from "@/components/AdminHeader";
import Script from "next/script";

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      const isLoginPage = pathname.includes("/admin/login");
      if (!user && !isLoginPage) {
        router.push("/admin/login");
      }
      setLoading(false);
    });
    return () => unsub();
  }, [pathname, router]);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <>
      <AdminHeader />
      <div className="p-6">{children}</div>
    </>
  );
}
