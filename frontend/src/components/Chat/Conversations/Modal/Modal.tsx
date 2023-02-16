import Participants from '@/components/Chat/Conversations/Modal/Participants';
import UserSearchList from '@/components/Chat/Conversations/Modal/UserSearchList';
import { SearchedUser, SearchUsersData, SearchUsersInput } from '@/utils/types';
import { useLazyQuery } from '@apollo/client';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import UserOperations from '@/graphql/operations/user';
import toast from "react-hot-toast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConversationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);
  const [searchUsers, { data, error, loading }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(UserOperations.Queries.searchUsers);

  const onCreateConversation = async () => {
    try {
      // createConversation mutation
    } catch (error: any) {
      console.log("onCreateConversation error", error);
      toast.error(error?.message)
    }
  }

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('onSearch');
    searchUsers({ variables: { username } });
  };

  const addParticipant = (user: SearchedUser) => {
    if (participants.some((p) => p.id === user.id)) return;
    setParticipants((prevState) => [...prevState, user]);
    setUsername('');
  };

  const removeParticipant = (userId: string) => {
    setParticipants((prevState) => prevState.filter((p) => userId !== p.id));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#2d2d2d" pb={4}>
          <ModalHeader>Create a Conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSearch}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <Button
                  type="submit"
                  isDisabled={!username}
                  isLoading={loading}
                >
                  Search
                </Button>
              </Stack>
            </form>
            {data?.searchUsers && (
              <UserSearchList
                users={data.searchUsers}
                addParticipant={addParticipant}
              />
            )}
            {participants.length !== 0 && (
              <>
                <Participants
                  participants={participants}
                  removeParticipant={removeParticipant}
                />
                <Button
                  bg="brand.100"
                  w="100%"
                  mt={6}
                  _hover={{ bg: 'brand.100' }}
                  // isDisabled={
                  onClick={() => {}}
                >
                  Create Conversation
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ConversationModal;
