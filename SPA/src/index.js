import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { msalConfig } from './authConfig';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

const msalInstance = new PublicClientApplication(msalConfig);

/**
 * ---- YENİ DÜZELTME BURADA ----
 * "uninitialized_public_client_application" hatasını çözmek için,
 * diğer API'leri çağırmadan önce initialize() fonksiyonunu çağırıyoruz.
 */
msalInstance.initialize()
    .then(() => {
        // 1. Initialize bittikten sonra hesapları ve event'leri ayarla
        if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
            msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
        }

        msalInstance.addEventCallback((event) => {
            if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
                const account = event.payload.account;
                msalInstance.setActiveAccount(account);
            }
        });

        // 2. "interaction_in_progress" hatasını çözmek için yönlendirmeyi işle
        return msalInstance.handleRedirectPromise();
    })
    .then(() => {
        // 3. Tüm MSAL işlemleri bittikten sonra uygulamayı render et
        const root = createRoot(document.getElementById('root'));
        root.render(
            <App instance={msalInstance} />
        );
    })
    .catch((error) => {
        // Hata olursa konsola yazdır
        console.error("MSAL başlatılırken bir hata oluştu:", error);
    });