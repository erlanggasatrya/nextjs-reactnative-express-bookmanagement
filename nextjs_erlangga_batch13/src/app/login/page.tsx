// src/app/login/page.tsx (Login Page)
import LoginForm from "@/components/organism/LoginForm";
import Head from "next/head";
import Image from "next/image";

const LoginPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>TechnoLib CMS - Login</title>
        <meta name="description" content="Login to TechnoLib CMS" />
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen bg-white relative">
        <div className="absolute top-0 left-0">
          <Image src='/login-top-decor.png' alt="Login top decoration" width={268} height={226}/>
        </div>
        <div className="absolute bottom-0 left-0">
          <Image src='/login-bottom-decor.png' alt="Login bottom decoration" width={284} height={226}/>
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
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
