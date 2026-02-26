import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDphDchSOC9flCQLuA6IveCzoS_j2IyAag",
    authDomain: "gamecenter-web.firebaseapp.com",
    projectId: "gamecenter-web",
    storageBucket: "gamecenter-web.firebasestorage.app",
    messagingSenderId: "980873515259",
    appId: "1:980873515259:web:efb38d2208e05bf016e05e",
    measurementId: "G-WTD97RZQZK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestForToken = async () => {
    try {
        console.log('[FCM] Requesting permission...');
        const permission = await Notification.requestPermission();
        console.log('[FCM] Permission status:', permission);

        if (permission !== 'granted') {
            console.warn('[FCM] Notification permission not granted');
            return null;
        }

        const currentToken = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_VAPID_KEY,
        });

        if (currentToken) {
            console.log('[FCM] Token generated successfully:', currentToken);
            return currentToken;
        } else {
            console.log('[FCM] No registration token available. Request permission to generate one.');
            return null;
        }
    } catch (err) {
        console.error('[FCM] An error occurred while retrieving token:', err);
        return null;
    }
};

export const onMessageListener = (callback: (payload: any) => void) => {
    return onMessage(messaging, (payload) => {
        console.log('[FCM] Foreground message received:', payload);
        callback(payload);
    });
};

export default app;
