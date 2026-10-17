import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  BackHandler,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import WebView, { WebViewNavigation } from 'react-native-webview';

// Default to local Wi-Fi dev server URL
const DEFAULT_URL = 'http://10.82.50.248:3000';

export default function App() {
  const [serverUrl, setServerUrl] = useState(DEFAULT_URL);
  const [inputUrl, setInputUrl] = useState(DEFAULT_URL);
  const [isNavigating, setIsNavigating] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfig, setShowConfig] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);

  const webViewRef = useRef<any>(null);

  // Handle hardware back button on Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      const onBackPress = () => {
        if (canGoBack && webViewRef.current) {
          webViewRef.current.goBack();
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }
  }, [canGoBack]);

  const handleReload = () => {
    setHasError(false);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const handleUpdateUrl = () => {
    let clean = inputUrl.trim();
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = 'http://' + clean;
    }
    setServerUrl(clean);
    setInputUrl(clean);
    setShowConfig(false);
    setHasError(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Retro Mini Header Bar */}
      <View style={styles.header}>
        <View style={styles.headerTitleWrap}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoIcon}>🏛️</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>CIVICS PLEASE</Text>
            <Text style={styles.headerSubtitle}>EXPO GO · MOBILE CLIENT</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setShowConfig(!showConfig)}
          style={styles.configButton}
          activeOpacity={0.7}
        >
          <Text style={styles.configButtonText}>{showConfig ? '✕' : '⚙️ IP'}</Text>
        </TouchableOpacity>
      </View>

      {/* Sleek Non-Blocking Page Transition Progress Line */}
      {isNavigating && loadProgress < 1 && (
        <View style={styles.progressBarContainer} pointerEvents="none">
          <View
            style={[
              styles.progressBar,
              { width: `${Math.max(15, Math.min(100, loadProgress * 100))}%` },
            ]}
          />
        </View>
      )}

      {/* Optional Quick IP Switcher Drawer */}
      {showConfig && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.configDrawer}
        >
          <Text style={styles.configLabel}>SERVER ADDRESS (PORT 3000):</Text>
          <View style={styles.configRow}>
            <TextInput
              style={styles.configInput}
              value={inputUrl}
              onChangeText={setInputUrl}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="http://10.82.50.248:3000"
              placeholderTextColor="#888"
            />
            <TouchableOpacity
              style={styles.configSaveButton}
              onPress={handleUpdateUrl}
            >
              <Text style={styles.configSaveText}>CONNECT</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.configHint}>
            Ensure your mobile device and computer are on the same Wi-Fi network.
          </Text>
        </KeyboardAvoidingView>
      )}

      {/* Main WebView Container */}
      <View style={styles.webContainer}>
        {hasError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>📡</Text>
            <Text style={styles.errorTitle}>CONNECTION LOST</Text>
            <Text style={styles.errorMessage}>
              Could not reach {serverUrl}. Make sure your Next.js dev server is running on port 3001 and your phone is on the same Wi-Fi network.
            </Text>

            <View style={styles.errorInputWrapper}>
              <TextInput
                style={styles.errorInput}
                value={inputUrl}
                onChangeText={setInputUrl}
                autoCapitalize="none"
                placeholder="http://<YOUR_IP>:3001"
              />
              <TouchableOpacity style={styles.retryButton} onPress={handleUpdateUrl}>
                <Text style={styles.retryButtonText}>CONNECT TO IP</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.secondaryButton} onPress={handleReload}>
              <Text style={styles.secondaryButtonText}>RETRY CONNECTION</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <WebView
            ref={webViewRef}
            source={{ uri: serverUrl }}
            style={styles.webview}
            originWhitelist={['*']}
            sharedCookiesEnabled={true}
            thirdPartyCookiesEnabled={true}
            domStorageEnabled={true}
            javaScriptEnabled={true}
            geolocationEnabled={true}
            mediaCapturePermissionGrantType="grant"
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            allowsBackForwardNavigationGestures={true}
            mixedContentMode="always"
            cacheEnabled={true}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={styles.initialLoadingContainer} pointerEvents="none">
                <ActivityIndicator size="large" color="#fa6355" />
                <Text style={styles.initialLoadingText}>LOADING CIVICS PLEASE...</Text>
              </View>
            )}
            onNavigationStateChange={(navState: WebViewNavigation): void => {
              setCanGoBack(Boolean(navState?.canGoBack));
            }}
            onLoadProgress={({ nativeEvent }: any) => {
              const p = nativeEvent?.progress || 0;
              setLoadProgress(p);
              if (p >= 0.95) {
                setIsNavigating(false);
              }
            }}
            onLoadStart={() => {
              setIsNavigating(true);
            }}
            onLoadEnd={() => {
              setIsNavigating(false);
            }}
            onError={(syntheticEvent: any) => {
              const { nativeEvent } = syntheticEvent;
              // Ignore subframe / client-side abort errors (-999 is NSURLErrorCancelled)
              if (nativeEvent?.code !== -999 && nativeEvent?.code !== -1004) {
                setHasError(true);
                setErrorMessage(nativeEvent?.description || 'Connection failed');
              }
              setIsNavigating(false);
            }}
            pullToRefreshEnabled={true}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2f9e1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#e2f9e1',
    borderBottomWidth: 2,
    borderBottomColor: '#113320',
  },
  headerTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 32,
    height: 32,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#113320',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#113320',
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 8,
    fontWeight: '800',
    color: 'rgba(17, 51, 32, 0.7)',
    letterSpacing: 1.5,
  },
  configButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#113320',
    paddingHorizontal: 10,
    paddingVertical: 6,
    shadowColor: '#113320',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  configButtonText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#113320',
  },
  progressBarContainer: {
    height: 3,
    backgroundColor: '#e2f9e1',
    width: '100%',
    zIndex: 99,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fa6355',
  },
  configDrawer: {
    backgroundColor: '#f4ebd6',
    borderBottomWidth: 2,
    borderBottomColor: '#113320',
    padding: 12,
  },
  configLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#113320',
    marginBottom: 6,
    letterSpacing: 1,
  },
  configRow: {
    flexDirection: 'row',
    gap: 8,
  },
  configInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#113320',
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: '#113320',
  },
  configSaveButton: {
    backgroundColor: '#fa6355',
    borderWidth: 2,
    borderColor: '#113320',
    paddingHorizontal: 14,
    justifyContent: 'center',
    shadowColor: '#113320',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  configSaveText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
  },
  configHint: {
    fontSize: 9,
    color: '#113320',
    opacity: 0.7,
    marginTop: 6,
  },
  webContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webview: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  initialLoadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#e2f9e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialLoadingText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#113320',
    marginTop: 14,
    letterSpacing: 1.5,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#f4ebd6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#113320',
    marginBottom: 8,
    letterSpacing: 1,
  },
  errorMessage: {
    fontSize: 12,
    color: 'rgba(17, 51, 32, 0.8)',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
    maxWidth: 320,
  },
  errorInputWrapper: {
    width: '100%',
    maxWidth: 320,
    marginBottom: 12,
  },
  errorInput: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#113320',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    marginBottom: 8,
    color: '#113320',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  retryButton: {
    backgroundColor: '#fa6355',
    borderWidth: 2,
    borderColor: '#113320',
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#113320',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#113320',
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#113320',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  secondaryButtonText: {
    color: '#113320',
    fontSize: 11,
    fontWeight: '800',
  },
});
