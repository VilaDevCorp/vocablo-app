import React, {useEffect, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import {
  minLength8Validator,
  notEmptyValidator,
  upperLowerCaseValidator,
  useValidator,
} from '../hooks/useValidator';
import {Input} from '../components/ui/Input/Input';
import {Button} from '../components/ui/Button/Button';
import {Form} from '../components/ui/Form/Form';
import {FormField} from '../components/ui/FormField/FormField';
import {useApi} from '../hooks/useApi';
import {useMutation} from '@tanstack/react-query';
import {useToast} from '../hooks/useToast';
import {ApiError, ErrorCode} from '../types/types';
import StatusCode from 'status-code-enum';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PublicScreenNavList} from '../types/navProps';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CodeInput} from '../components/ui/CodeInput/CodeInput';
import {InfoMessage} from '../components/atoms/InfoMessage';
import {useError} from '../hooks/useError';
import { PasswordInput } from '../components/ui/Input/PasswordInput';

type Props = NativeStackScreenProps<PublicScreenNavList, 'ResetPassword'>;

export function ResetPasswordScreen({route}: Props) {
  const {navigate} = useNavigation<NavigationProp<PublicScreenNavList>>();
  const {showToast} = useToast();
  const {resetPassword} = useApi();
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const {setError} = useError(navigate);

  const [
    passwordDirty,
    passwordError,
    passwordMessage,
    passwordValidate,
    setDirtyPassword,
  ] = useValidator(password, [
    notEmptyValidator,
    minLength8Validator,
    upperLowerCaseValidator,
  ]);
  const [passwordMatchError, setPasswordMatchError] = useState<string>('');
  const [passwordMatchDirty, setPasswordMatchDirty] = useState<boolean>(false);

  const [validationCode, setValidationCode] = useState<string>('------');
  const [
    validationCodeDirty,
    validationCodeError,
    validationCodeMessage,
    validationCodeValidate,
    setDirtyValidationCode,
  ] = useValidator(validationCode, [notEmptyValidator]);
  const username = route?.params?.username;

  const passwordMatchValidate = () => {
    if (!passwordMatchDirty && (password || repeatPassword)) {
      setPasswordMatchDirty(true);
    }
    if (password === repeatPassword) {
      setPasswordMatchError('');
      return true;
    } else {
      setPasswordMatchError('The passwords do not match');
      return false;
    }
  };

  useEffect(() => {
    passwordMatchValidate();
  }, [password, repeatPassword]);

  const changePassword = async () => {
    const passwordValid = passwordValidate();
    const passwordMatchValid = passwordMatchValidate();
    const validationCodeValid = validationCodeValidate();
    if (passwordValid && passwordMatchValid && validationCodeValid) {
      await resetPassword(username, validationCode, password);
    } else {
      showToast('There are errors in the form', 'alert', 'error');
    }
  };
  const {mutate: onChangePassword, isPending: isLoading} = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      showToast('The password has been changed', 'check', 'success');
      navigate('Login');
    },
    onError: e => {
      if (e instanceof ApiError) {
        if (e.statusCode === StatusCode.ClientErrorNotFound) {
          showToast('There is no code created', 'alert', 'error');
          return;
        }
        if (e.statusCode === StatusCode.ClientErrorConflict) {
          showToast('The code has already been used', 'alert', 'error');
          return;
        }
        if (e.statusCode === StatusCode.ClientErrorGone) {
          showToast('The code has expired', 'alert', 'error');
          return;
        }
        if (
          e.statusCode === StatusCode.ClientErrorUnauthorized &&
          e.code === ErrorCode.INCORRECT_VALIDATION_CODE
        ) {
          showToast('The code is invalid', 'alert', 'error');
          return;
        }
      }
      setError(e);
    },
  });

  const disabledButton =
    isLoading ||
    passwordError ||
    passwordMatchError !== '' ||
    new RegExp('^\\d{6}$').test(validationCode) === false;

  return (
    <View style={{flex: 1}}>
      <Form
        fields={
          <>
            <InfoMessage style={{marginBottom: 8}}>
              {
                'Enter the code received on your email and the new password for your account'
              }
            </InfoMessage>
            <FormField
              input={
                <CodeInput
                  charNumber={6}
                  code={validationCode}
                  setCode={setValidationCode}
                  onBlur={() => setDirtyValidationCode()}
                />
              }
            />
            <FormField
              input={
                <PasswordInput
                  value={password}
                  setValue={setPassword}
                  icon="lock"
                  type="password"
                  label="New password"
                  onBlur={() => setDirtyPassword()}
                />
              }
              errorMsg={
                passwordDirty && passwordError ? passwordMessage : undefined
              }
            />
            <FormField
              input={
                <PasswordInput
                  value={repeatPassword}
                  icon="lock"
                  setValue={setRepeatPassword}
                  type="password"
                  label="Repeat new password"
                />
              }
              errorMsg={passwordMatchDirty ? passwordMatchError : undefined}
            />
          </>
        }
        buttons={
          <Button
            disabled={disabledButton}
            isLoading={isLoading}
            onPress={() => onChangePassword()}>
            {'Change password'}
          </Button>
        }
      />
    </View>
  );
}
