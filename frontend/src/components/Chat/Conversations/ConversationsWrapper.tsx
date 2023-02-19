import { ConversationsData } from '@/utils/types';
import { useQuery } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { Session } from 'next-auth';
import ConversationList from './ConversationList';
import ConversationOperations from '@/graphql/operations/conversation';

interface ConversationsWrapperProps {
  session: Session;
}

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({
  session,
}) => {
  const {
    data: conversationsData,
    error: conversationsError,
    loading: conversationsLoading,
  } = useQuery<ConversationsData, any>(
    ConversationOperations.Queries.conversations,
  );

  console.log('HERE IS CONVERSATION WRAPPER DATA', conversationsData);

  return (
    <Box w={{ base: '100%', md: '400px' }} bg="whiteAlpha.50" py={6} px={3}>
      {/* Skeleton */}
      <ConversationList session={session} conversations={conversationsData?.conversations || []} />
    </Box>
  );
};
export default ConversationsWrapper;
