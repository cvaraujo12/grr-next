'use client';

import { useState, useEffect } from 'react';

interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
}

export function useNotification() {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      console.warn('Este navegador não suporta notificações desktop');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermission(permission);
      return permission === 'granted';
    } catch (error) {
      console.error('Erro ao solicitar permissão de notificação:', error);
      return false;
    }
  };

  const sendNotification = async ({ title, body, icon }: NotificationOptions) => {
    if (!('Notification' in window)) {
      console.warn('Este navegador não suporta notificações desktop');
      return;
    }

    if (permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) return;
    }

    try {
      new Notification(title, {
        body,
        icon,
      });
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
    }
  };

  return {
    permission,
    requestPermission,
    sendNotification,
  };
}
