import { useEffect, useState, useCallback } from 'react';
import { requestForToken, onMessageListener } from '../firebase';
import { getItemFromStorage, setItemToStorage } from '../utils/localstorage.utils';
import { useUpdateFcmTokenMutation } from '../services/redux/apis/auth';
import { useAppDispatch } from '../services/redux/store';
import { addNotification } from '../services/redux/slices/notifications.slice';


const useFcmToken = (user: any) => {
    console.log('[useFcmToken] Hook initialized for user:', user?.id || 'anonymous');
    const [token, setToken] = useState<string | null>(null);
    const [updateFcmToken] = useUpdateFcmTokenMutation();
    const dispatch = useAppDispatch();

    const getDeviceId = useCallback((): string => {
        let deviceId = getItemFromStorage<string>('device_id');
        if (!deviceId) {
            deviceId = crypto.randomUUID();
            setItemToStorage('device_id', deviceId);
        }
        return deviceId;
    }, []);

    const syncToken = useCallback(async () => {
        if (!user?.accessToken) {
            console.log('[useFcmToken] No user session, skipping sync');
            return;
        }

        console.log('[useFcmToken] Starting token sync flow...');
        const fcmToken = await requestForToken();

        if (fcmToken) {
            setToken(fcmToken);
            const deviceId = getDeviceId();

            try {
                await updateFcmToken({
                    fcm_token: fcmToken,
                    device_id: deviceId
                }).unwrap();
                console.log('[useFcmToken] Success: FCM Token synced with backend');
            } catch (error) {
                console.error('[useFcmToken] Error syncing FCM Token:', error);
            }
        } else {
            console.warn('[useFcmToken] Failed to get FCM token');
        }
    }, [user, updateFcmToken, getDeviceId]);

    useEffect(() => {
        if (user?.accessToken) {
            syncToken();
        }
    }, [user?.accessToken, syncToken]);

    // Handle Foreground Messages
    useEffect(() => {
        const unsubscribe = onMessageListener((payload: any) => {
            console.log('[useFcmToken] Foreground message received:', payload);

            // Only show alert in the active tab to avoid duplicates if multiple tabs are open
            if (document.visibilityState !== 'visible') return;

            if (payload?.notification) {
                const { title, body } = payload.notification;
                const redirectUrl = payload.data?.url;

                // Add to Redux Store
                dispatch(addNotification({
                    title: title || "Notification",
                    message: body || "",
                    url: redirectUrl
                }));

                if (redirectUrl) {
                    const shouldRedirect = confirm(`${title}\n\n${body}\n\nClick OK to visit.`);
                    if (shouldRedirect) {
                        window.location.href = redirectUrl;
                    }
                } else {
                    alert(`${title}\n\n${body}`);
                }
            }
        });

        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, []);

    // Watch for permission changes
    useEffect(() => {
        if (!('Notification' in window)) return;

        const handlePermissionChange = () => {
            console.log('[useFcmToken] Permission changed to:', Notification.permission);
            if (Notification.permission === 'granted') {
                syncToken();
            }
        };

        // There's no direct 'permissionchange' event for Notifications in all browsers,
        // but we can poll or check when the window regained focus.
        window.addEventListener('focus', handlePermissionChange);
        return () => window.removeEventListener('focus', handlePermissionChange);
    }, [syncToken]);

    return token;
};

export default useFcmToken;
