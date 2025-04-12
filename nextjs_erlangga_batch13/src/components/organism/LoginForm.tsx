// src/components/organisms/LoginForm.tsx
"use client";
import React, { useEffect } from "react";
import EmailInput from "../molecules/EmailInput";
import PasswordInput from "../molecules/PasswordInput";
import Button from "../atoms/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
import { IUserLoginRequestBody } from "@/interfaces/auth/login.interface";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostLogin } from "@/services/auth/mutation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authDataActions } from "@/store/reducer/authData";
import { useGetUser } from "@/services/auth/query";

// const loginSchema = z.object({
//   email: z
//     .string()
//     .min(1, { message: "Email can't be empty!" })
//     .email({ message: "Invalid email address" }),
//   password: z
//     .string()
//     .min(1, { message: "Password can't be empty!" })
//     .min(8, { message: "Password must be at least 8 characters" }),
// });

// type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Email tidak valid")
      .required("Kolom email wajib untuk diisi!"),
    password: Yup.string().required("Kolom password wajib untuk diisi"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IUserLoginRequestBody>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const { mutate: mutateLogin } = usePostLogin();
  const { data: userData, refetch } = useGetUser();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleGetUser = () => {
    refetch();
  };

  useEffect(() => {
    if (userData?.status && userData.data) {
      dispatch(
        authDataActions.setUserData({
          id: userData.data.id,
          created_at: userData.data.created_at,
          email: userData.data.email,
          name: userData.data.name,
          profile: userData.data.profile,
          role: userData.data.role,
        })
      );
      router.replace("/books");
    }
  }, [userData, dispatch, router]);

  const onLogin = () => {
    const loginData = watch();
    console.log("cek data", loginData);
    mutateLogin(loginData, {
      onError: (res) => {
        toast.error(res.message || "Internal server error");
        console.log("error", JSON.stringify(res, null, 2));
      },
      onSuccess: (res) => {
        toast.success(res.message);
        if (res.data?.refreshToken) {
          localStorage.setItem("refreshToken", res.data.refreshToken);
        }
        handleGetUser();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onLogin)} className="w-full max-w-sm">
      <EmailInput {...register("email")} error={errors.email?.message} />
      <PasswordInput
        {...register("password")}
        error={errors.password?.message}
      />
      <div className="mt-4 text-sm text-gray-600 text-right">
        <Link href="/forgot-password">
          <span className="text-[#221B1B] cursor-pointer hover:underline">
            Forgot your Password?
          </span>
        </Link>
      </div>
      <div className="mt-4 flex justify-center">
        <Button
          variant="primary"
          type="submit"
          className="w-[327px]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
