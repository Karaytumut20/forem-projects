import { db } from './config'; // Firestore yapılandırması
import { collection, getDocs, query, where, setDoc, doc, orderBy, limit } from 'firebase/firestore'; // orderBy ve limit işlevlerini içe aktarın

// Fonksiyon tanımı
export const addDomainDetails = async (uid, selectedDomain, serverLocation) => {
  try {
    const collectionName = 'freeDomain';
    const collectionRef = collection(db, collectionName);

    // selectedDomain adının mevcut olup olmadığını kontrol et
    const q = query(collectionRef, where('domain', '==', selectedDomain));
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
      domain: selectedDomain,
      userID: uid,
      location: serverLocation,
      createdAt: new Date().toISOString()
    });

    console.log('Belge başarıyla yazıldı!');
  } catch (error) {
    console.error('Belge yazma hatası: ', error);
    throw error;
  }
}
