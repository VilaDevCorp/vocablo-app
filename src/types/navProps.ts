export type RootStackParamList = {
  PublicScreen: undefined;
  PrivateScreen: undefined;
  AddWordModal: undefined;
};

export type PrivateScreenNavList = {
  Home: undefined;
  MyWords: undefined;
  AddWord: undefined;
};

export type PublicScreenNavList = {
  Register: undefined;
  Login: undefined;
  ForgottenPassword: undefined;
  ResetPassword: { username: string };
  Validation: { username: string };
};

export type AddWordModalNavList = {
  SearchWord: undefined;
  SaveWord: undefined;
};

export type MyWordsStackNavList = {
  MyWordsList: undefined;
  WordDetails: { userWordId: string };
};
