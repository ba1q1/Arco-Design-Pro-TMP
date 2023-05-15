import axios from 'axios';
import { LoginUrl, LogoutUrl, GetUserInfoUrl, GetMenuListUrl } from '@/api/requrls/user';
import type { RouteRecordNormalized } from 'vue-router';
import type { UserState } from '@/store/modules/user/types';
import type { LoginData, LoginRes } from '@/models/user';

export function login(data: LoginData) {
  return axios.post<LoginRes>(LoginUrl, data);
}

export function logout() {
  return axios.post<LoginRes>(LogoutUrl);
}

export function getUserInfo() {
  return axios.post<UserState>(GetUserInfoUrl);
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>(GetMenuListUrl);
}
