import { initializeApp } from "firebase-admin";
import { cert, getApps } from "firebase-admin/app";

const firebaseAdminConfig = {
    credential: cert({
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID
    })
}


export function initializeAdmin() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}
