import { db } from './config'; // Firestore yapılandırması
import { doc, setDoc, collection } from 'firebase/firestore';

// Fonksiyon tanımı
export const addDomainDetails = async (uid, selectedDomain) => {
  try {
    const collectionName = 'domainSelection';
    const docRef = doc(collection(db, collectionName));

    await setDoc(docRef, {
      userID: uid,
      domain: selectedDomain,
      createdAt: new Date().toISOString()
    });

    console.log('Belge başarıyla yazıldı!');
  } catch (error) {
    console.error('Belge yazma hatası: ', error);
    throw error;
  }
}