"use client";

import { styled, Container, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "@/app/(DashboardLayout)/layout/header/Header";
import Sidebar from "@/app/(DashboardLayout)/layout/sidebar/Sidebar";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const loadFromStorage = useAuthStore((state) => state.loadFromStorage);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Kullanıcıyı storage'dan yükle (component mount olduğunda)
  useEffect(() => {
    const load = async () => {
      await loadFromStorage();
      setLoading(false);
    };
    load();
  }, [loadFromStorage]);

  // user değiştikçe yönlendirme kontrolü
  useEffect(() => {
    if (!loading && user === null) {
      router.push("/authentication/login");
    }
  }, [user, loading, router]);

  // Kullanıcı veya storage henüz yüklenmediğinde boş ekran gösterebilirsin veya loader
  if (loading) {
    return null; // veya <LoadingSpinner /> gibi bir bileşen koyabilirsin
  }
  if (!user) {
    return null;
  }

  return (
    <MainWrapper className="mainwrapper">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <PageWrapper className="page-wrapper">
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
