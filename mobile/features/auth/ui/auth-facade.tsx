import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useCheckStudent } from '@/entities/student';

type Props = {
  children: React.ReactNode;
};

export const AuthFacade: React.FC<Props> = ({
  children,
}) => {
  const { isLoading } = useCheckStudent();

  return (
    <View style={styles.container}>
      {children}
      {isLoading && (
        <ActivityIndicator
          style={styles.loader}
          size="small"
          color="#0000ff"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
