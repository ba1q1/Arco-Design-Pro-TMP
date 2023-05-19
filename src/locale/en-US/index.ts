import dayjsLocale from 'dayjs/locale/en';
import localeSettings from './settings';
import sys from './sys';
import localeMessageBox from '@/components/message-box/locale/en-US';
import minder from '@/components/minder-editor/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';
import localeWorkplace from '@/views/dashboard/workplace/locale/en-US';

export default {
  message: {
    'menu.dashboard': 'Dashboard',
    'menu.minder': 'Minder',
    'menu.server.dashboard': 'Dashboard-Server',
    'menu.server.workplace': 'Workplace-Server',
    'menu.server.monitor': 'Monitor-Server',
    'menu.list': 'List',
    'menu.result': 'Result',
    'menu.exception': 'Exception',
    'menu.form': 'Form',
    'menu.profile': 'Profile',
    'menu.visualization': 'Data Visualization',
    'menu.user': 'User Center',
    'menu.arcoWebsite': 'Arco Design',
    'menu.faq': 'FAQ',
    'navbar.docs': 'Docs',
    'navbar.action.locale': 'Switch to English',
    ...sys,
    ...localeSettings,
    ...localeMessageBox,
    ...localeLogin,
    ...localeWorkplace,
    ...minder,
  },
  dayjsLocale,
  dayjsLocaleName: 'en-US',
};
