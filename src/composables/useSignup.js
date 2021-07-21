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
    error.value = err.message;
    console.log(error.value);
  }
};

const useSignup = () => {
  return { error, signup };
};

export default useSignup;
