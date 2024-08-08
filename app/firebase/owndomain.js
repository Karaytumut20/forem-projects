import { db } from './config'; // Firestore yapılandırması
import { collection, getDocs, query, where, setDoc, doc, orderBy, limit } from 'firebase/firestore'; // orderBy ve limit işlevlerini içe aktarın

// Fonksiyon tanımı
export const addOwnDomainDetails = async (domain, userID, location) => {
  try {
    const collectionName = 'ownDomain';
    const collectionRef = collection(db, collectionName);

    // ownDomain adının mevcut olup olmadığını kontrol et
    const q = query(collectionRef, where('ownDomain', '==', domain));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error('This domain name is already taken.');
    }

    // En yüksek ownDomainID'yi almak için sorgu oluştur
    const highestIdQuery = query(collectionRef, orderBy('ownDomainID', 'desc'), limit(1));
    const highestIdSnapshot = await getDocs(highestIdQuery);

    let newID = 1;
    highestIdSnapshot.forEach((doc) => {
      const data = doc.data();
      newID = data.ownDomainID + 1;
    });

    const docRef = doc(collectionRef);

    await setDoc(docRef, {
      ownDomainID: newID,
      ownDomain: domain,
      userID: userID,
      location: location,
      createdAt: new Date().toISOString()
    });

    console.log('Belge başarıyla yazıldı!');
  } catch (error) {
    console.error('Belge yazma hatası: ', error);
    throw error;
  }
}
