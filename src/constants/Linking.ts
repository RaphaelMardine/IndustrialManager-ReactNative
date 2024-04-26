const config = {
  screens: {
    ResetPassword: {
      path: 'new-password/:token/:email',
      parse: {
        resetToken: (resetToken: string) => `${resetToken}`,
        email: (email: string) => `${email}`,
      },
    },
  },
};

const linking = {
  prefixes: ['nuntek://nuntek'],
  config,
};

export default linking;
