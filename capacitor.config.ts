import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.civicsplease.app',
  appName: 'Civics Please',
  webDir: 'out',
  server: {
    // When testing live on mobile device / emulator connected to local dev server:
    // url: 'http://10.146.142.248:3001',
    // cleartext: true
  }
};

export default config;
