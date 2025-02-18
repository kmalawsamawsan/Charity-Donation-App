import { auth } from './firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firestore = getFirestore();

export const registerUser = async (email, password, userData) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    await setDoc(doc(firestore, 'users', user.uid), {
      email: user.email,
      ...userData
    });

    console.log('User registered and data stored successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
