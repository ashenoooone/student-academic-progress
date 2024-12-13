import $api from '@/shared/api';

export class StudentService {
  static async checkMe() {
    return $api.get('auth/check');
  }

  static async register() {
    return $api.post('auth/signup');
  }
}
