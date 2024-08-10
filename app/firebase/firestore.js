import { db } from './config'; // Firestore yapılandırması
import { collection, getDocs, query, where } from 'firebase/firestore'; // orderBy ve limit işlevlerini içe aktarın

// Fonksiyon tanımı
export const checkDomainAvailability = async (selectedDomain) => {
  try {
    const collectionName = 'freeDomain';
    const collectionRef = collection(db, collectionName);

    // selectedDomain adının mevcut olup olmadığını kontrol et
    const q = query(collectionRef, where('domain', '==', selectedDomain));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return false; // Domain mevcut
    }

    return true; // Domain mevcut değil
  } catch (error) {
    console.error('Domain kontrol hatası: ', error);
    throw error;
  }
}
