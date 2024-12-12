import * as SecureStore from 'expo-secure-store';

class SecureStoreService {
  static async save(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error(`Ошибка при сохранении данных по ключу "${key}":`, error);
    }
  }

  static async getValue(key: string): Promise<string | null> {
    try {
      const result = await SecureStore.getItemAsync(key);
      return result;
    } catch (error) {
      console.error(`Ошибка при получении данных по ключу "${key}":`, error);
      return null;
    }
  }

  static async deleteValue(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error(`Ошибка при удалении данных по ключу "${key}":`, error);
    }
  }
}

export default SecureStoreService;