// src/authConfig.js

import { LogLevel } from '@azure/msal-browser';

export const msalConfig = {
    auth: {
        /**
         * 'Uygulama (istemci) Kimliği' (Application (client) ID) değeriniz.
         */
        clientId: 'bb7b60c4-####-####-####-7f53f3f823e7', // Bu ID doğru

        /**
         * External ID (CIAM) için doğru format Tenant ADI kullanır, ID değil.
         * Trailing slash olmamalı - MSAL otomatik olarak ekler.
         */
        authority: 'https://##############.ciamlogin.com',

        /**
         * React Router olmadığı için root URL kullanıyoruz.
         * MSAL redirect'i handleRedirectPromise() ile işliyor.
         */
        redirectUri: 'https://furkantosunhwapp-gdh3cwhhh9dce0f2.westeurope-01.azurewebsites.net/callback', 
        
        postLogoutRedirectUri: '/', 
        navigateToLoginRequestUrl: false, 
    },
    cache: {
        cacheLocation: 'sessionStorage', 
        storeAuthStateInCookie: false,      
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                // Hata ayıklama için konsol günlüklerini açabilirsin
                // console.log(message);
            },
            logLevel: LogLevel.Info,
            piiLoggingEnabled: false,
        },
    },
};

export const loginRequest = {
    scopes: ['openid', 'offline_access', 'profile'],
    
    /**
     * CIAM için user flow'u authority'ye eklemek yerine,
     * domain_hint veya policy parametresi kullanılmalı.
     * Eğer user flow kullanıyorsanız, authority'yi şu şekilde belirtin:
     * authority: 'https://FurkanHWCustTenant.ciamlogin.com/{tenant-id-or-name}/{user-flow-name}'
     * Ancak genellikle sadece tenant authority yeterlidir.
     */
    // authority belirtilmezse msalConfig'deki authority kullanılır
};