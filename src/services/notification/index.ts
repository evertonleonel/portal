import { api } from '@/lib/axios';
import type { GetNotificationResponse } from '@/types/notification/http';

export async function getAllNotifications() {
  const response = await api.get<GetNotificationResponse[]>(`/v1/notification`);
  return response.data;
}
