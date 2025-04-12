// app/forgot-password/page.tsx
"use client";
import React, { useState } from "react";
import ForgotPasswordForm from "@/components/organism/ForgotPasswordForm";
import VerifyOTPForm from "@/components/organism/VerifyOTPForm";
import ResetPasswordForm from "@/components/organism/ResetPasswordForm";
import Head from "next/head";
import Image from "next/image";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1); // 1: Forgot, 2: Verify, 3: Reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <>
      <Head>
        <title>TechnoLib CMS - Forgot Password</title>
        <meta name="description" content="Forgot Password to TechnoLib CMS" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white relative">
        <div className="absolute top-0 left-0">
          <Image
            src="/login-top-decor.png"
            alt="Login top decoration"
            width={268}
            height={226}
          />
        </div>
        <div className="absolute bottom-0 left-0">
          <Image
            src="/login-bottom-decor.png"
            alt="Login bottom decoration"
            width={284}
            height={226}
          />
        </div>
        <div className="flex items-center justify-between w-full max-w-4xl px-8 gap-50">
          <div className="flex-shrink-0">
            <Image
              src="/technolib-logo.png"
              alt="TechnoLib Logo"
              width={261}
              height={265}
            />
          </div>

          <div className="flex flex-col items-center flex-1">
            <h1 className="text-3xl font-semibold mb-8 text-center underline underline-offset-8 decoration-[#131852]">
              TechnoLib CMS
            </h1>
            {step === 1 && (
              <ForgotPasswordForm
                onSuccess={() => {
                  setStep(2);
                }}
              />
            )}
            {step === 2 && (
              <VerifyOTPForm
                email={email}
                onSuccess={() => {
                  setStep(3);
                }}
              />
            )}
            {step === 3 && <ResetPasswordForm email={email} otp={otp} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
