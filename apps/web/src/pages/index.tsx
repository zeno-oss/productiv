import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const hello = api.task.hello.useQuery({ text: "from tRPC" });
  const location = useRouter();
  console.log(location);
  return (
    <>
      <Head>
        <title>Productiv</title>
        <meta name="description" content="Productiv appointment scheduling" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          This website is used for Productiv's Appointment scheduling feature.
        </div>
      </main>
    </>
  );
};

export default Home;
