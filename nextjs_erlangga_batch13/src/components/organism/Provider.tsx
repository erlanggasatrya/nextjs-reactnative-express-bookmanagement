"use client";
import { queryClient } from "@/services/config/queryClient";
import { AppStore, persistor, store } from "@/store/storage";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useRef } from "react";
import { Provider as AppProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = store;
  }
  return (
    <AppProvider store={storeRef.current}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools client={queryClient} />
        </QueryClientProvider>
      </PersistGate>
    </AppProvider>
  );
};

export default Provider;
