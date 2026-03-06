importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyDphDchSOC9flCQLuA6IveCzoS_j2IyAag",
    authDomain: "gamecenter-web.firebaseapp.com",
    projectId: "gamecenter-web",
    storageBucket: "gamecenter-web.firebasestorage.app",
    messagingSenderId: "980873515259",
    appId: "1:980873515259:web:efb38d2208e05bf016e05e",
    measurementId: "G-WTD97RZQZK"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const title = payload?.notification?.title || payload?.data?.title || 'New Notification';
    const body = payload?.notification?.body || payload?.data?.body || '';
    const url = payload?.data?.url || '/';

    // Use a unique tag so each notification stacks independently instead of replacing the previous one
    const uniqueTag = `gcn-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    const notificationOptions = {
        body,
        icon: '/GameCenterfavicon.png',
        badge: '/GameCenterfavicon.png',
        tag: uniqueTag,      // unique tag → no collapsing
        renotify: true,      // play sound/vibrate even if a notification is already visible
        data: { url },
    };

    self.registration.showNotification(title, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
    console.log('[firebase-messaging-sw.js] Notification clicked', event);
    event.notification.close();

    const urlToOpen = event.notification.data?.url || '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            // Check if there is already a window open with this URL
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            // If no window found, open a new one
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});

// Required for PWA installability
self.addEventListener('fetch', (event) => {
    // Basic network-first or pass-through
    // For now, just a pass-through to satisfy PWA criteria without aggressive caching
    event.respondWith(fetch(event.request));
});
