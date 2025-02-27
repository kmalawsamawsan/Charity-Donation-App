import { auth } from './firebase';

const loginUser = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    console.log('User logged in successfully:', user);
  } catch (error) {
    console.error('Error logging in user:', error);
  }
};

export default loginUser;
