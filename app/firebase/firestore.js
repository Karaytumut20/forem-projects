import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const handleSaveToFirestore = async () => {
  try {
    const ownDomainCollection = collection(db, 'ownDomainTable');
    const ownDomainSnapshot = await getDocs(ownDomainCollection);
    const ownDomainCount = ownDomainSnapshot.size;

    // Assign a new ownDomainID if it is '0'
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
      userID: userID
    };

    if (ownDomain !== '0') {
      const ownDomainData = {
        ownDomainID: ownDomainID,
        Domain: ownDomain,
        userID: userID,
        location: ownServerLocation
      };
      await setDoc(doc(db, 'ownDomainTable', ownDomainID || 'default_ownDomainID'), ownDomainData);
    }

    if (freeDomain !== '0') {
      const freeDomainData = {
        freeDomainID: freeDomainID,
        freeDomain: freeDomain,
        userID: userID,
        location: location
      };
      await setDoc(doc(db, 'freeDomainTable', freeDomainID || 'default_freeDomainID'), freeDomainData);
    }

    await setDoc(doc(db, 'communityTable', communityName || 'default_name'), communityData);

    console.log('Data saved to Firestore successfully');
  } catch (error) {
    console.error('Error saving data to Firestore:', error);
  }
};
