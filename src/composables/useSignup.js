import { ref } from 'vue';
import { auth } from '../firebase/config';

const error = ref('');

const signup = async (name, email, password) => {
  error.value = null;

  try {
    const user = await auth.createUserWithEmailAndPassword(email, password);
    if (!user) {
      throw new Error('An error occured! Please try again later.');
    }

    await user.user.updateProfile({ displayName: name });
    error.value = null;
    return user;
  } catch (err) {
    if (err.code === 'auth/internal-error') {
      error.value = 'Something went wrong. Please try again later!';
    } else {
      error.value = err.message;
    }
  }
};

const useSignup = () => {
  return { error, signup };
};

export default useSignup;
