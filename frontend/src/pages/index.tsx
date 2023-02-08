import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';

const Home: NextPage = () => {
  const { data } = useSession();

  console.log('HERE IS DATA', data);

  return (
    <>
      <Head>
        <title>iMessage</title>
      </Head>
      <main>
        {data?.user ? (
          <button onClick={() => signOut()}>Sign Out</button>
        ) : (
          <button onClick={() => signIn('google')}>Sign In</button>
        )}
        <br />
        {data?.user?.name}
      </main>
    </>
  );
};

export default Home;
