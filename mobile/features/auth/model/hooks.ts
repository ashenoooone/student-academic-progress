import { StudentService } from '@/entities/student';
import { useMutation } from '@tanstack/react-query';

export const useSignin = () => {
  return useMutation({
    mutationKey: ['signin'],
    mutationFn: (data: {
      login: string;
      password: string;
    }) => StudentService.signin(data),
  });
};
