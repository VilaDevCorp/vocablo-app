import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {PublicScreenNavList} from '../types/navProps';
import {Button} from '../components/ui/Button/Button';
import {Form} from '../components/ui/Form/Form';
import {colors} from '../styleVars';
import {Link} from '../components/ui/Link/Link';
import {useMutation} from '@tanstack/react-query';
import {useAuth} from '../hooks/useAuth';
import {useToast} from '../hooks/useToast';
import {ApiError, ErrorCode} from '../types/types';
import StatusCode from 'status-code-enum';
import {useError} from '../hooks/useError';
import {useApi} from '../hooks/useApi';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Icon} from '../components/ui/Icon/Icon';
import {Typography} from '../components/ui/Typography/Typography';
import {CodeInput} from '../components/ui/CodeInput/CodeInput';
import {InfoMessage} from '../components/atoms/InfoMessage';
import {FormField} from '../components/ui/FormField/FormField';

type Props = NativeStackScreenProps<PublicScreenNavList, 'Validation'>;

export function ValidationScreen({route}: Props) {
  const {navigate} = useNavigation<NavigationProp<PublicScreenNavList>>();
  const username = route?.params?.username;
  const auth = useAuth();
  const {sendValidationCode, validateAccount} = useApi();
  const {setError} = useError(navigate);
  const {showToast} = useToast();

  const [validationCode, setValidationCode] = useState<string>('------');

  const [validationSuccess, setValidationSuccess] = useState<boolean>(false);

  const resendCode = async () => {
    await sendValidationCode(username);
  };

  const {mutate: onResendCode, isPending: isSendingCode} = useMutation({
    mutationFn: resendCode,
    onSuccess: () => {
      showToast('The code was succesfully sent!', 'check', 'success');
      setValidationCode('------');
    },
    onError: e => {
      if (e instanceof ApiError) {
        if (e.statusCode === StatusCode.ClientErrorConflict) {
          showToast('The account is already validated', 'alert', 'error');
          return;
        }
      }
      if (e instanceof Error) {
        setError(e);
      }
    },
  });

  const validate = async () => {
    await validateAccount(username, validationCode);
  };

  const {mutate: onValidateAccount, isPending: isValidationLoading} =
    useMutation({
      mutationFn: validate,
      onSuccess: () => {
        setValidationSuccess(true);
      },
      onError: e => {
        if (e instanceof ApiError) {
          if (e.statusCode === StatusCode.ClientErrorNotFound) {
            showToast('There is no code created', 'alert', 'error');
            return;
          }
          if (e.statusCode === StatusCode.ClientErrorConflict) {
            showToast(
              'The code has already been used. Send another.',
              'alert',
              'error',
            );
            return;
          }
          if (e.statusCode === StatusCode.ClientErrorGone) {
            showToast(
              'The code has expired. Send another.',
              undefined,
              'error',
            );
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

  const disabledValidateButton =
    isValidationLoading ||
    isSendingCode ||
    new RegExp('^\\d{6}$').test(validationCode) === false;

  return (
    <View style={{flex: 1}}>
      {!validationSuccess ? (
        <Form
          fields={
            <View style={{gap: 18}}>
              <InfoMessage>
                {
                  'Your account has not been validated yet. Write the code received on your email.'
                }
              </InfoMessage>
              <CodeInput
                code={validationCode}
                setCode={setValidationCode}
                charNumber={6}
              />
              <Button
                variant="outlined"
                iconLeft="repeat"
                isLoading={isSendingCode}
                disabled={isSendingCode}
                onPress={() => onResendCode()}>
                {'Send another code'}
              </Button>
            </View>
          }
          buttons={
            <Button
              onPress={() => onValidateAccount()}
              isLoading={isValidationLoading}
              disabled={disabledValidateButton}>
              {'Validate'}
            </Button>
          }
        />
      ) : (
        <View>
          <View style={{gap: 8, alignItems: 'center'}}>
            <Icon type="check" size={64} color={colors.success[900]} />
            <Text
              style={{
                color: colors.success[900],
                fontSize: 18,
                marginBottom: 8,
                fontFamily: 'MerriweatherSans-Bold',
              }}>
              {'Your account has been validated'}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: colors.neutral[800]}}>{'You can now '}</Text>
              <Link onPress={() => navigate('Login')}>login</Link>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
