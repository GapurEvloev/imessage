import Auth from "@/components/Auth/Auth";
import Chat from "@/components/Chat/Chat";
import { Box } from "@chakra-ui/react";
import { Inter } from '@next/font/google';
import { NextPage, NextPageContext } from 'next';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

const Home: NextPage = () => {
  const { data: session } = useSession();

  console.log('HERE IS SESSION', session);

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  return (
    <Box>
      {session?.user.username ? (
        <Chat session={session} />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </Box>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    }
  }
}

export default Home;
