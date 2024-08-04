import { db } from './config';
import { doc, setDoc, collection } from 'firebase/firestore';

export const addDomainSelection = async (uid, selectedDomain) => {
  try {
    const collectionName = 'domainSelection';
    const docRef = doc(collection(db, collectionName));

    await setDoc(docRef, {
      userID: uid,
      domain: selectedDomain,
      createdAt: new Date().toISOString()
    });
    console.log('Document successfully written!');
  } catch (error) {
    console.error('Error writing document: ', error);
    throw error;
  }
};
