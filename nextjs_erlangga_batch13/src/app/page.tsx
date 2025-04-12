import Head from "next/head";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>TechnoLib CMS</title>
        <meta name="description" content="TechnoLib CMS Homepage" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome to TechnoLib CMS</h1>
        <p className="text-lg mb-8">Please log in to continue.</p>
        <Link href="/login">
          <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go to Login
          </span>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
