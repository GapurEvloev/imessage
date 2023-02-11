const resolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: (_: any, args: { username: string }, context: any) => {
      const { username } = args;
      console.log("HEY AT THE API", username);
      console.log("HERE IS CONTEXT", context);
    },
  },
};

export default resolvers;
