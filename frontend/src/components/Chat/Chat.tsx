import { Button, Flex } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import ConversationsWrapper from './Conversations/ConversationsWrapper';
import FeedWrapper from './Feed/FeedWrapper';

interface IChatProps {
  session: Session;
}

const Chat: React.FC<IChatProps> = ({ session }) => {
  return (
    <Flex h="100vh">
      <ConversationsWrapper session={session} />
      <FeedWrapper session={session} />
      <Button onClick={()=> signOut()}>Logout</Button>
    </Flex>
  );
};

export default Chat;