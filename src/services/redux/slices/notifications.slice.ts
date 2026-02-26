import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppNotification {
    id: string;
    title: string;
    message: string;
    time: string;
    unread: boolean;
    url?: string;
}

interface NotificationsState {
    notifications: AppNotification[];
}

const initialState: NotificationsState = {
    notifications: [],
};

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Omit<AppNotification, 'id' | 'time' | 'unread'>>) => {
            const newNotification: AppNotification = {
                ...action.payload,
                id: crypto.randomUUID(),
                time: "Just now",
                unread: true,
            };
            state.notifications = [newNotification, ...state.notifications];
        },
        markAsRead: (state, action: PayloadAction<string>) => {
            const notification = state.notifications.find(n => n.id === action.payload);
            if (notification) {
                notification.unread = false;
            }
        },
        markAllAsRead: (state) => {
            state.notifications.forEach(n => n.unread = false);
        },
        clearNotifications: (state) => {
            state.notifications = [];
        },
    },
});

export const { addNotification, markAsRead, markAllAsRead, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
