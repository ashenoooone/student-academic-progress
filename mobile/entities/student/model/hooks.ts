import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { StudentService } from './student.service';

export const CURRENT_STUDENT_BASE_QUERY_KEY = 'curuser';

export const useCheckStudent = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [CURRENT_STUDENT_BASE_QUERY_KEY],
    queryFn: () => StudentService.checkMe(),
    select: (r) => r.data,
  });

  if (query.isError) {
    // удаляем весь кеш если авторизация слетела
    queryClient.clear();
  }

  return query;
};

export const useGetCurrentStudent = () => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData([
    CURRENT_STUDENT_BASE_QUERY_KEY,
  ]);
};
