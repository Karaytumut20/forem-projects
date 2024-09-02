import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../../firebase/config';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Confirmation = () => {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [freeDomain, setFreeDomain] = useState('0');
  const [location, setLocation] = useState('0');
  const [ownDomain, setOwnDomain] = useState('0');
  const [ownServerLocation, setOwnServerLocation] = useState('0');
  const [adminEmail, setAdminEmail] = useState('0');
  const [adminPassword, setAdminPassword] = useState('0');
  const [communityName, setCommunityName] = useState('0');
  const [communityDescription, setCommunityDescription] = useState('0');
  const [paymentStatus, setPaymentStatus] = useState('0');
  const [createdDate, setCreatedDate] = useState(new Date().toISOString());
  const [freeDomainID, setFreeDomainID] = useState('0');
  const [ownDomainID, setOwnDomainID] = useState('0');
  const [userID, setUserID] = useState('0');

  // Firebase Authentication referansı
  const auth = getAuth();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFreeDomain = localStorage.getItem('freeDomain') || '0';
      const storedFreeLocation = localStorage.getItem('serverLocation') || '0';
      const storedOwnDomain = localStorage.getItem('ownDomain') || '0';
      const storedOwnLocation = localStorage.getItem('ownServerLocation') || '0';
      const selectedDomainType = localStorage.getItem('selectedDomainType') || 'free';

      if (selectedDomainType === 'free') {
        setFreeDomain(storedFreeDomain);
        setLocation(storedFreeLocation);
        setOwnDomain('0'); // Kendi alan adını sıfırla
        setOwnServerLocation('0'); // Kendi sunucu konumunu sıfırla
      } else if (selectedDomainType === 'own') {
        setFreeDomain('0'); // Ücretsiz alan adını sıfırla
        setLocation('0'); // Ücretsiz sunucu konumunu sıfırla
        setOwnDomain(storedOwnDomain);
        setOwnServerLocation(storedOwnLocation);
      }

      setAdminEmail(localStorage.getItem('community_adminEmail') || '0');
      setAdminPassword(localStorage.getItem('community_password') || '0');
      setCommunityName(localStorage.getItem('community_name') || '0');
      setCommunityDescription(localStorage.getItem('community_desc') || '0');
      setPaymentStatus(localStorage.getItem('community_paymentStatus') || '0');
      setCreatedDate(localStorage.getItem('community_createdDate') || new Date().toISOString());
      setFreeDomainID(localStorage.getItem('freeDomainID') || '0');
      setOwnDomainID(localStorage.getItem('ownDomainID') || '0');

      // Kullanıcı ID'sini Firebase Authentication'dan çekme
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserID(user.uid); // Kullanıcı ID'sini ayarla
        } else {
          setUserID('0'); // Kullanıcı oturum açmamışsa sıfırla
        }
      });
    }
  }, [auth]);

  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  const handleSaveToFirestore = async () => {
    try {
      let currentOwnDomainID = ownDomainID;
      let currentFreeDomainID = freeDomainID;

      if (ownDomain !== '0') {
        const ownDomainCollection = collection(db, 'ownDomainTable');
        const ownDomainSnapshot = await getDocs(ownDomainCollection);
        const ownDomainCount = ownDomainSnapshot.size;

        // Yeni bir ownDomainID atayın
        currentOwnDomainID = (ownDomainCount + 1).toString();

        const ownDomainData = {
          ownDomainID: currentOwnDomainID,
          Domain: ownDomain,
          userID: userID,
          location: ownServerLocation,
        };
        await setDoc(doc(db, 'ownDomainTable', currentOwnDomainID || 'default_ownDomainID'), ownDomainData);

        // freeDomainID'yi sıfırla
        currentFreeDomainID = '0';
      }

      if (freeDomain !== '0') {
        const freeDomainCollection = collection(db, 'freeDomainTable');
        const freeDomainSnapshot = await getDocs(freeDomainCollection);
        const freeDomainCount = freeDomainSnapshot.size;

        // Yeni bir freeDomainID atayın
        currentFreeDomainID = (freeDomainCount + 1).toString();

        const freeDomainData = {
          freeDomainID: currentFreeDomainID,
          freeDomain: freeDomain,
          userID: userID,
          location: location,
        };
        await setDoc(doc(db, 'freeDomainTable', currentFreeDomainID || 'default_freeDomainID'), freeDomainData);

        // ownDomainID'yi sıfırla
        currentOwnDomainID = '0';
      }

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
        freeDomainID: currentFreeDomainID,
        ownDomainID: currentOwnDomainID,
        userID: userID,
      };

      await setDoc(doc(db, 'communityTable', communityName || 'default_name'), communityData);

      console.log('Veriler Firestore\'a başarıyla kaydedildi');
    } catch (error) {
      console.error('Veriler Firestore\'a kaydedilirken hata oluştu:', error);
    }
  };

  const handleContinue = async () => {
    if (selectedPlan) {
      const planDetails = {
        name: selectedPlan === 'basic' ? 'Basic Plan' : 'Standard Plan',
        price: selectedPlan === 'basic' ? '$59' : '$99',
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedPlan', JSON.stringify(planDetails));
      }

      await handleSaveToFirestore(); // Verileri Firestore'a kaydet

      if (typeof window !== 'undefined') {
        window.location.href = 'checkout'; // Ödeme sayfasına yönlendirme
      }
    }
  };

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="background.default"
      p={3}
    >
      <Typography variant="h4" gutterBottom>
        Ödeme İşlemine Geçmeden Önce Bilgilerinizi Gözden Geçirin
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Ödeme sayfasına geçmeden önce, her şeyin mükemmel göründüğünden emin olalım. Lütfen aşağıdaki bilgilerinizi gözden geçirin:
      </Typography>
      <Box bgcolor="background.paper" p={3} borderRadius={2} boxShadow={3} mb={4}>
        <Typography variant="h6">
          Ücretsiz Alan Adı: {freeDomain !== '0' ? `${freeDomain}.forem2go.org` : 'N/A'}
        </Typography>
        <Typography variant="h6">Ücretsiz Alan Adı Konumu: {location !== '0' ? location : 'N/A'}</Typography>
        <Typography variant="h6">Kendi Alan Adı: {ownDomain !== '0' ? ownDomain : 'N/A'}</Typography>
        <Typography variant="h6">Kendi Alan Adı Konumu: {ownServerLocation !== '0' ? ownServerLocation : 'N/A'}</Typography>
        <Typography variant="h6">Topluluk Adı: {communityName}</Typography>
        <Typography variant="h6">Yönetici E-postası: {adminEmail}</Typography>
        <Typography variant="h6">Yönetici Şifresi: {adminPassword}</Typography>
        <Typography variant="h6">Topluluk Açıklaması: {communityDescription}</Typography>
        <Typography variant="h6">Ödeme Durumu: {paymentStatus}</Typography>
        <Typography variant="h6">Oluşturma Tarihi: {new Date(createdDate).toLocaleString()}</Typography>
      </Box>

      {/* Plan Kartları Bölümü */}
      <div className="card mb-3" style={{ maxWidth: '600px', border: '1px solid #ddd' }}>
        <div className="card-body d-flex align-items-center">
          <input
            type="radio"
            id="basic"
            name="plan"
            value="basic"
            checked={selectedPlan === 'basic'}
            onChange={handlePlanChange}
            className="me-3"
            style={{ transform: 'scale(1.5)' }}
          />
          <div>
            <h5 className="card-title mb-1">$59 <small className="text-muted">Aylık</small></h5>
            <p className="card-text mb-1">Temel Plan</p>
            <ul className="list-unstyled" style={{ fontSize: '14px', lineHeight: '1.5' }}>
              <li>• Sınırsız üye</li>
              <li>• Sınırsız personel</li>
              <li>• Aylık 50k sayfa görüntüleme</li>
              <li>• community.heliotrops.org alan adı</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card mb-4" style={{ maxWidth: '600px', border: '1px solid #ddd' }}>
        <div className="card-body d-flex align-items-center">
          <input
            type="radio"
            id="standard"
            name="plan"
            value="standard"
            checked={selectedPlan === 'standard'}
            onChange={handlePlanChange}
            className="me-3"
            style={{ transform: 'scale(1.5)' }}
          />
          <div>
            <h5 className="card-title mb-1">$99 <small className="text-muted">Aylık</small></h5>
            <p className="card-text mb-1">Standart Plan</p>
            <ul className="list-unstyled" style={{ fontSize: '14px', lineHeight: '1.5' }}>
              <li>• Sınırsız üye</li>
              <li>• Sınırsız personel</li>
              <li>• Aylık 50k sayfa görüntüleme</li>
              <li>• community.heliotrops.org alan adı</li>
            </ul>
          </div>
        </div>
      </div>

      <Box display="flex" justifyContent="space-between" width="100%" mt={3} style={{ maxWidth: '600px' }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleGoBack}
          sx={{ flex: 1, mr: 1 }}
        >
          Geri Dön
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleContinue}
          sx={{ flex: 1, ml: 1 }}
        >
          Devam Et
        </Button>
      </Box>
    </Box>
  );
};

export default Confirmation;
