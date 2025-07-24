
import { initializeApp, AppOptions, cert, getApps } from "firebase-admin/app";

const firebaseAdminConfig: AppOptions = {
    credential: cert({
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'), // ✅ important for multiline keys
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    }),
};

export function initializeAdmin() {
    if (getApps().length === 0) {
        initializeApp(firebaseAdminConfig);
    }
}
