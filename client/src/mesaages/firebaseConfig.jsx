import { initializeApp } from 'firebase/app';
import { getMessaging, getToken as fetchToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBdDyK_WLgOsDN5r93bfBOpKJNySULg8uU",
  authDomain: "messages-b3c55.firebaseapp.com",
  projectId: "messages-b3c55",
  storageBucket: "messages-b3c55.appspot.com",
  messagingSenderId: "249825010256",
  appId: "1:249825010256:web:aa3b16f27662cf82022755"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const getToken = async () => {
  try {
    // Request permission to send notifications
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await fetchToken(messaging, { vapidKey: 'YOUR_PUBLIC_VAPID_KEY' });
      console.log('FCM Token:', token);
      return token;
    } else {
      console.error('Notification permission denied or blocked.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
};

onMessage(messaging, (payload) => {
  console.log('Message received:', payload);
  alert(`${payload.notification.title}: ${payload.notification.body}`);
});
