import Auth from '@/components/Auth/Auth';
import Chat from '@/components/Chat/Chat';
import { Box } from '@chakra-ui/react';
import { NextPage, NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data } = useSession();

  console.log('HERE IS DATA', data);

  return (
    <Box >
      {
        data?.user?.username ? (
          <>
          <Chat/>
          </>
        ) : (
          <>
            <Auth/>
          </>
        )
      }
    </Box>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);

  return {
    props: {
      session
    }
  }
}

export default Home;
