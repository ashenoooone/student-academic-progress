import $api from '@/shared/api';

export class StudentService {
  static async checkMe() {
    return $api.get('auth/check');
  }

  static async signin(body: {
    login: string;
    password: string;
  }) {
    return $api.post('auth/signin', body);
  }
}
