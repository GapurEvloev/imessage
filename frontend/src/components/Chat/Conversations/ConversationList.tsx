import ConversationItem from '@/components/Chat/Conversations/ConversationItem';
import { Box, Text } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { useRouter } from "next/router";
import { useState } from 'react';
import ConversationModal from './Modal/Modal';
import { ConversationPopulated } from '../../../../../backend/src/utils/types';

interface ConversationListProps {
  session: Session;
  conversations: ConversationPopulated[];
  onViewConversation: (conversationId: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  session,
  conversations,
  onViewConversation,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {
    user: { id: userId },
  } = session;

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <Box w="100%">
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={onOpen}
      >
        <Text textAlign={'center'} color="whiteAlpha.800" fontWeight={500}>
          Find or start conversation
        </Text>
      </Box>
      <ConversationModal session={session} isOpen={isOpen} onClose={onClose} />
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          userId={userId}
          conversation={conversation}
          onClick={() => onViewConversation(conversation.id)}
          isSelected={conversation.id === router.query.conversationId}
        />
      ))}
    </Box>
  );
};
export default ConversationList;
