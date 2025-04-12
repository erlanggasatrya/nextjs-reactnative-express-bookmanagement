// app/page.tsx
import Sidebar from "@/components/organism/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

const Home = () => {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">Welcome Admin</h1>
            <p className="text-lg text-gray-600 mt-2">
              Manage your library efficiently.
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Home;
