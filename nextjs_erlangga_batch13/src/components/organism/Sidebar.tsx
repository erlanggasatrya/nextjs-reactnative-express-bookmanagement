// components/organisms/Sidebar.tsx
"use client";
import React from "react";
import SidebarItem from "@/components/atoms/SidebarItem";
import Button from "@/components/atoms/Button";
import { HomeIcon, BooksIcon, BorrowingIcon } from "@/components/atoms/Icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePostLogout } from "@/services/auth/mutation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/storage";
import { toast } from "react-toastify";
import { authDataActions } from "@/store/reducer/authData";

const Sidebar = () => {
  // const router = useRouter();
  const { mutate: mutateLogout, isPending: isLoggingOut } = usePostLogout();
  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.authData);

  const handleLogout = () => {
    mutateLogout(undefined, {
      onSuccess: (res) => {
        dispatch(authDataActions.resetAuth());
        window.location.href = "/login";
        toast.success(res.message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="w-64 bg-white p-4 flex flex-col">
      <div className="flex items-center gap-2 mt-8 mb-10">
        <Image
          src={
            userData.profile
              ? `${process.env.NEXT_PUBLIC_BASE_URL}/${userData.profile}`
              : "/user-icon.png"
          }
          alt="User Icon"
          width={24}
          height={24}
          className="rounded-full"
        />
        <span className="text-[#131852]">
          {userData.name || "Bootcamp Batch 13"}
        </span>
      </div>

      {/* Navigation Link */}
      <SidebarItem href="/home" label="Home">
        <HomeIcon />
      </SidebarItem>
      <SidebarItem href="/books" label="Books">
        <BooksIcon />
      </SidebarItem>
      <SidebarItem href="/borrowing" label="Borrowing">
        <BorrowingIcon />
      </SidebarItem>

      {/* Logout Button */}
      <div className="mt-auto">
        <Button
          variant="primary"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <Image
            src="/logout-icon.png"
            alt="Logout Icon"
            width={20}
            height={20}
            className="mr-2"
          />
          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
