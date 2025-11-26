import { useMsal } from '@azure/msal-react';
import { Container, Card } from 'react-bootstrap';
import '../styles/App.css';

export const UserInfo = () => {
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();

    if (!activeAccount || !activeAccount.idTokenClaims) {
        return null;
    }

    const claims = activeAccount.idTokenClaims;
    
    // Debug: Tüm claim'leri konsola yazdır (geliştirme sırasında)
    console.log('All token claims:', claims);
    console.log('Active account:', activeAccount);
    console.log('Name claim:', claims.name);
    console.log('Given name:', claims.given_name);
    console.log('Family name:', claims.family_name);
    console.log('Surname:', claims.surname);
    console.log('Display name:', claims.displayName);
    
    // Kullanıcı adı için tüm olası kaynakları kontrol et
    let name = '';
    
    // 1. Önce activeAccount'un kendi name property'sini kontrol et
    if (activeAccount.name && activeAccount.name !== 'unknown' && activeAccount.name.trim() !== '') {
        name = activeAccount.name;
    }
    // 2. Token claim'lerinden name'i kontrol et
    else if (claims.name && claims.name !== 'unknown' && claims.name.trim() !== '') {
        name = claims.name;
    }
    // 3. displayName claim'ini kontrol et
    else if (claims.displayName && claims.displayName !== 'unknown' && claims.displayName.trim() !== '') {
        name = claims.displayName;
    }
    // 4. given_name ve family_name kombinasyonunu dene
    else if (claims.given_name || claims.family_name || claims.surname) {
        const givenName = claims.given_name || '';
        const familyName = claims.family_name || claims.surname || '';
        name = `${givenName} ${familyName}`.trim();
    }
    // 5. Email'den ad çıkarmayı dene (email formatı: ad.soyad@domain.com veya ad@domain.com)
    else {
        const email = claims.email || claims.preferred_username || '';
        if (email && email !== 'unknown') {
            // Email'den ad çıkar (örn: furkan.yilmaz@example.com -> Furkan Yilmaz)
            const emailParts = email.split('@')[0];
            if (emailParts.includes('.')) {
                const nameParts = emailParts.split('.');
                name = nameParts.map(part => 
                    part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
                ).join(' ');
            } else {
                name = emailParts.charAt(0).toUpperCase() + emailParts.slice(1).toLowerCase();
            }
        }
    }
    
    // Eğer hala boşsa, varsayılan değer
    if (!name || name.trim() === '' || name === 'unknown') {
        name = 'Kullanıcı';
    }
    
    // Email bilgisi
    const email = claims.email || claims.preferred_username || claims.upn || 'Email bulunamadı';

    return (
        <Container className="user-info-container">
            <Card className="user-info-card">
                <Card.Body>
                    <div className="user-info-content">
                        <div className="user-info-item">
                            <strong>Ad Soyad:</strong> {name}
                        </div>
                        <div className="user-info-item">
                            <strong>Email:</strong> {email}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

