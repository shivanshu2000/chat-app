import { ref } from 'vue';
import { auth } from '../firebase/config';

const error = ref('');

const login = async (email, password) => {
  try {
    const res = await auth.signInWithEmailAndPassword(email, password);
    error.value = null;
    return res;
  } catch (err) {
    error.value = 'Invalid email or password';
  }
};

const useLogin = () => {
  return { login, error };
};

export default useLogin;
