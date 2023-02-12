import { Box } from '@chakra-ui/react';
import { Session } from 'next-auth';
import ConversationList from './ConversationList';

interface ConversationsWrapperProps {
  session: Session;
}

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({
  session,
}) => {
  return (
    <Box w={{ base: '100%', md: '400px' }} bg="whiteAlpha.50" py={6} px={3}>
      {/* Skeleton */}
      <ConversationList session={session} />
    </Box>
  );
};
export default ConversationsWrapper;
