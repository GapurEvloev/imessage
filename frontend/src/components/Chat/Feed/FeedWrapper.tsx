import MessagesHeader from "@/components/Chat/Feed/Messages/Header";
import { Flex, Text } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({ session }) => {
  const router = useRouter();
  const { conversationId } = router.query;
  const {user: {id: userId}} = session

  return (
    <Flex
      display={{ base: conversationId ? 'flex' : 'none', md: 'flex' }}
      w="100%"
      direction="column"
    >
      {conversationId && typeof conversationId === "string" ? (
        <Flex
          direction="column"
          justify="space-between"
          overflow="hidden"
          flexGrow={1}
        >
          {/*{conversationId}*/}
          <MessagesHeader
            userId={userId}
            conversationId={conversationId}
          />
          {/*<Messages*/}
          {/*  userId={session.user.id}*/}
          {/*  conversationId={conversationId}*/}
          {/*/>*/}
        </Flex>

      ) : (
        <Text>No conversation</Text>
      )}
    </Flex>
  );
};
export default FeedWrapper;
