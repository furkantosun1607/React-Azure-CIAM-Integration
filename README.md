# Secure Cloud Identity: React SPA with Microsoft Entra External ID

![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Entra ID](https://img.shields.io/badge/Microsoft%20Entra%20ID-Secure-blue)

## 🚀 Project Overview

This project demonstrates a secure authentication implementation for a **Single Page Application (SPA)** deployed on **Microsoft Azure**. 

Unlike traditional authentication methods, this project utilizes **Microsoft Entra External ID (CIAM)** to handle customer identity, ensuring enterprise-grade security. The application is containerized and deployed via **Azure App Service (PaaS)**.


## 🏗 Architecture & Key Features

This project focuses on **Cloud Security** and **Identity Management** architecture:

* **Identity Provider:** Microsoft Entra External ID (Customer Tenant).
* **Authentication Protocol:** OAuth 2.0 & OIDC (OpenID Connect) using MSAL.js.
* **Infrastructure:** Azure App Service (Web Apps) for scalable hosting.
* **Security:** * No hardcoded secrets (Environment Variables used).
    * Secure User Flows (Sign-up, Sign-in, Password Reset).
    * Protected Routes (Access restricted to authenticated users only).

## 🛠️ Technical Implementation Details

### 1. Azure Configuration
* Created a dedicated **Resource Group** for isolation.
* Configured **App Registration** with specific Redirect URIs for both `localhost` (Dev) and `azurewebsites.net` (Prod).
* Managed **Tenant switch** operations between the Main Subscription and External ID Tenant.
## 1. Infrastructure Setup
* **Resource Group:** `<YourName>-HW-Entra-RG`
* **App Service Plan:** Linux (Free/Shared Tier for Student/Dev use)
* **App Service Name:** `<Your-App-Name>`
* **Public URL:** `https://<Your-App-Name>.azurewebsites.net`

## 2. Identity & Authentication (Microsoft Entra External ID)
A dedicated External Tenant was created to handle customer identities separate from the main workforce tenant.

* **Tenant Domain:** `<YourName>-HW-Customer-Tenant.onmicrosoft.com`
* **App Registration:**
    * **Platform:** Single-page application (SPA)
    * **Redirect URIs:**
        * Local: `http://localhost:3000`
        * Production: `https://<Your-App-Name>.azurewebsites.net`
* **Authentication Library:** Microsoft Authentication Library (MSAL) for React.

## 3. User Experience & Flows
A custom "Sign-up and Sign-in" user flow was implemented to manage the user journey.

* **User Flow Name:** `B2C_1_signupsignin` (or your specific flow name)
* **Identity Provider:** Email and Password.
* **User Attributes Collected:**
    * Display Name
    * Given Name
    * Surname
    * Email Address

## 4. Deployment Configuration
The application is deployed via GitHub integration/Local Git to Azure App Service. Environment variables are configured in the Azure Portal to keep sensitive information secure.

| Setting | Description |
| :--- | :--- |
| `REACT_APP_CLIENT_ID` | The Application (client) ID from Entra External ID. |
| `REACT_APP_AUTHORITY` | The authority URL for the External Tenant. |
| `REACT_APP_REDIRECT_URI` | The production URL of the App Service. |

### 2. Authentication Logic (MSAL Integration)
Integrated **Microsoft Authentication Library (MSAL) for React** to handle the complex handshake of acquiring ID Tokens.

```javascript
// Example: Validating user session
const { accounts } = useMsal();
// If accounts.length > 0, the user is securely authenticated via Entra ID.
