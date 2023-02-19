import { Stack, Text } from '@chakra-ui/react';
import { useState } from "react";
import { ConversationPopulated } from '../../../../../backend/src/utils/types';

interface ConversationItemProps {
  conversation: ConversationPopulated;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (event: React.MouseEvent) => {

  };

  return (
    <Stack
      direction="row"
      align="center"
      justify="space-between"
      p={4}
      cursor="pointer"
      borderRadius={4}
      bg={'whiteAlpha.200'}
      _hover={{ bg: 'whiteAlpha.200' }}
      onClick={handleClick}
      onContextMenu={handleClick}
      position="relative"
    >
      <Text>{conversation.id}</Text>
    </Stack>
  );
};

export default ConversationItem;
