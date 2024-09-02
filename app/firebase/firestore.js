import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const handleSaveToFirestore = async () => {
  try {
    const ownDomainCollection = collection(db, 'ownDomainTable');
    const ownDomainSnapshot = await getDocs(ownDomainCollection);
    const ownDomainCount = ownDomainSnapshot.size;

    // Tanımlanmamış değişkenler için varsayılan değerler
    const adminEmail = 'defaultEmail@example.com'; // Bu değişkenleri uygun değerlerle doldurun
    const adminPassword = 'defaultPassword';
    const communityDescription = 'Default Community Description';
    const communityName = 'Default Community Name';
    const createdDate = new Date().toISOString(); // Şu anki tarihi kullan
    const paymentStatus = 'Pending'; // Örnek varsayılan değer
    const selectedPlan = 'Free'; // Örnek varsayılan değer
    const freeDomain = '0'; // Örnek varsayılan değer, değiştirin
    const freeDomainID = '0'; // Örnek varsayılan değer, değiştirin
    const ownDomain = '0'; // Örnek varsayılan değer, değiştirin
    const ownServerLocation = 'Default Location'; // Örnek varsayılan değer
    const location = 'Default Location'; // Örnek varsayılan değer
    const userID = 'exampleUserID'; // Uygun kullanıcı ID'si ile değiştirin

    // Assign a new ownDomainID if it is '0' or not set
    let ownDomainID = localStorage.getItem('ownDomainID') || '0';
    ownDomainID = ownDomainID === '0' ? (ownDomainCount + 1).toString() : ownDomainID;

    const communityData = {
      AdminEmail: adminEmail,
      AdminPassword: adminPassword,
      CommunityDesc: communityDescription,
      CommunityID: '0',
      CommunityName: communityName,
      CreatedDate: createdDate,
      PaymentStatus: paymentStatus,
      SelectedPlan: selectedPlan,
      freeDomain: freeDomain,
      freeDomainID: freeDomainID,
      ownDomainID: ownDomainID,
      userID: userID,
    };

    // Save ownDomainData if ownDomain is not '0'
    if (ownDomain !== '0') {
      const ownDomainData = {
        ownDomainID: ownDomainID,
        Domain: ownDomain,
        userID: userID,
        location: ownServerLocation,
      };
      await setDoc(doc(db, 'ownDomainTable', ownDomainID), ownDomainData);
    }

    // Save freeDomainData if freeDomain is not '0'
    if (freeDomain !== '0') {
      const freeDomainData = {
        freeDomainID: freeDomainID,
        freeDomain: freeDomain,
        userID: userID,
        location: location,
      };
      await setDoc(doc(db, 'freeDomainTable', freeDomainID), freeDomainData);
    }

    // Save communityData
    await setDoc(doc(db, 'communityTable', communityName.replace(/\s+/g, '_')), communityData); // CommunityName'i uygun bir doküman ID'sine dönüştürüyoruz

    console.log('Data saved to Firestore successfully');
  } catch (error) {
    console.error('Error saving data to Firestore:', error);
  }
};

export default handleSaveToFirestore;
