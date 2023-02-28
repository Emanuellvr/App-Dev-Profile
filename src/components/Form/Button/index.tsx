import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Container, Title } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  title,
  ...otherProps
}) => {
  return (
    <Container {...otherProps}>
      <Title>{title}</Title>
    </Container>
  );
};
