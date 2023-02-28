import React from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useForm, FieldValues } from 'react-hook-form';
import { Button } from '../../components/Form/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  BackToSignIn,
  BackToSignInTitle,
  Container,
  Content,
  Icon,
  Logo,
  Title,
} from './styles';
import logo from '../../assets/logo.png';
import { useNavigation } from '@react-navigation/native';
import { InputControl } from '../../components/Form/InputControl';
import { api } from '../../services/api';

interface ScreenNavigationProp {
  goBack: () => void;
}

interface IFormInputs {
  [name: string]: any;
}

const formSchema = yup.object({
  name: yup.string().required('Informe o nome completo'),
  email: yup.string().email('Email inválido').required('Informe o email'),
  password: yup.string().required('Informe a senha'),
});

export const SignUp: React.FunctionComponent = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(formSchema),
  });

  const { goBack } = useNavigation<ScreenNavigationProp>();

  const handlSignUp = async (form: IFormInputs) => {
    const data = {
      name: form.name,
      email: form.email,
      password: form.password,
    };
    try {
      await api.post('users', data);

      Alert.alert(
        'Cadastro realizado',
        'Você ja pode fazer login na aplicação',
      );
    } catch (error) {
      Alert.alert(
        'Erro no cadastro',
        'Occorreu um erro ao fazer o cadastro. Tente novamente.',
      );
    }
  };

  return (
    <KeyboardAvoidingView
      enabled
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Content>
            <Logo source={logo} />
            <Title>Crie sua conta</Title>
            <InputControl
              autoCorrect={false}
              control={control}
              name="name"
              placeholder="Nome Completo"
              error={errors.name &&  errors.name.message?.toString()}
            />
            <InputControl
              name="email"
              autoCorrect={false}
              control={control}
              placeholder="Email"
              keyboardType="email-address"
              error={errors.email &&  errors.email.message?.toString()}
            />
            <InputControl
              name="password"
              control={control}
              placeholder="Senha"
              error={errors.password &&  errors.password.message?.toString()}
            />

            <Button title="Cria conta" onPress={handleSubmit(handlSignUp)} />
          </Content>
        </Container>
      </ScrollView>

      <BackToSignIn onPress={() => goBack()}>
        <Icon name="arrow-left" />
        <BackToSignInTitle>Voltar para login</BackToSignInTitle>
      </BackToSignIn>
    </KeyboardAvoidingView>
  );
};
