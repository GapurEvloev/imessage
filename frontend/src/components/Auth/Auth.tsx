import React from 'react';
import { Button, Center, Image, Input, Stack, Text } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import UserOperations from '@/graphql/operations/user';
import { CreateUsernameData, CreateUsernameVariables } from '@/utils/types';

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = React.useState('');
  const [createUsername, { data, loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);

  console.log('HERE IS DATA', { data, loading, error });

  const onSubmit = async () => {
    if (!username) return;

    try {
      await createUsername({
        variables: {
          username,
        },
      });
    } catch (error: any) {
      console.log('onSubmit error', error);
    }
  };

  return (
    <Center height="100vh">
      <Stack spacing={8} align="center">
        {session ? (
          <>
            <Text fontSize="3xl">Create an Username</Text>
            <Input
              placeholder="Enter a username"
              value={username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(event.target.value)
              }
            />
            <Button onClick={onSubmit} width="100%" isDisabled={!username} isLoading={loading}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Image height={100} alt="" src="/images/imessage-logo.png" />
            <Text fontSize="4xl">MessengerQL</Text>
            <Text width="70%" align="center">
              Sign in with Google to send unlimited free messages to your
              friends
            </Text>
            <Button
              onClick={() => signIn('google')}
              leftIcon={
                <Image height="20px" alt="" src="/images/googlelogo.png" />
              }
            >
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
