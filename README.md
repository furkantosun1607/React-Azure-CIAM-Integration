# Secure Cloud Identity: React SPA with Microsoft Entra External ID

![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Entra ID](https://img.shields.io/badge/Microsoft%20Entra%20ID-Secure-blue)

## 🚀 Project Overview

This project demonstrates a secure authentication implementation for a **Single Page Application (SPA)** deployed on **Microsoft Azure**. 

Unlike traditional authentication methods, this project utilizes **Microsoft Entra External ID (CIAM)** to handle customer identity, ensuring enterprise-grade security. The application is containerized and deployed via **Azure App Service (PaaS)**.

> **Live Demo:** [https://senin-app-ismin.azurewebsites.net](https://senin-app-ismin.azurewebsites.net) *(Not: Link çalışmasa bile buraya yazmak ciddiyet gösterir, eğer kapattıysan "Deployment: Azure App Service" yazıp bırakabilirsin)*

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

### 2. Authentication Logic (MSAL Integration)
Integrated **Microsoft Authentication Library (MSAL) for React** to handle the complex handshake of acquiring ID Tokens.

```javascript
// Example: Validating user session
const { accounts } = useMsal();
// If accounts.length > 0, the user is securely authenticated via Entra ID.