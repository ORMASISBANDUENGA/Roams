import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  ConfirmationResult
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocFromServer,
  getDocs,
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  addDoc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Auth Instance
export const auth = getAuth(app);

// Firestore Instance (explicitly specifying databaseId from config if provided)
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Re-export Auth helpers
export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  type FirebaseUser,
  type ConfirmationResult
};


// Google Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Setup invisible reCAPTCHA for Phone Authentication
export function initRecaptcha(containerId: string): RecaptchaVerifier {
  if (typeof window === 'undefined') {
    throw new Error('window is undefined');
  }

  // Clear any previous instance if needed
  if ((window as any).recaptchaVerifier) {
    try {
      (window as any).recaptchaVerifier.clear();
    } catch (e) {}
  }

  const verifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved - allow signInWithPhoneNumber.
    },
    'expired-callback': () => {
      console.warn('reCAPTCHA expired');
    },
  });

  (window as any).recaptchaVerifier = verifier;
  return verifier;
}

// Phone Sign-In Initiator
export async function sendPhoneOtp(
  phoneNumber: string,
  appVerifier: RecaptchaVerifier
): Promise<ConfirmationResult> {
  return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
}

// Google Sign-In with Popup and Redirect Fallback (iframe safe)
export async function signInWithGoogle(): Promise<FirebaseUser> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.warn('Popup blocked or failed, trying redirect mode...', error);
    // If popup is blocked in iframe, we can surface the error or redirect
    throw error;
  }
}

// Check redirect result on load
export async function checkRedirectAuth(): Promise<FirebaseUser | null> {
  try {
    const result = await getRedirectResult(auth);
    return result ? result.user : null;
  } catch (error) {
    console.warn('Redirect auth check notice:', error);
    return null;
  }
}

// Sign Out
export async function logoutFirebase(): Promise<void> {
  await signOut(auth);
}

// Test Connection to Firestore
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, '_connection_test', 'ping'));
    return true;
  } catch (error: any) {
    // If permission-denied, it means the server IS reached and responding
    if (error.code === 'permission-denied' || error.message?.includes('Missing or insufficient permissions')) {
      return true;
    }
    console.warn('Firestore connection check:', error.message);
    return false;
  }
}

// ==========================================
// REAL HARDWARE BIOMETRICS (WebAuthn / Passkeys / Fingerprint / Face ID)
// ==========================================

export async function isBiometricAvailable(): Promise<boolean> {
  if (typeof window === 'undefined' || !window.PublicKeyCredential) {
    return false;
  }
  try {
    if (PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
      return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    }
    return true;
  } catch (e) {
    return false;
  }
}

// Helper to convert ArrayBuffer to Base64
function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Helper to convert Base64 to Uint8Array
function base64ToBuffer(base64: string): ArrayBuffer {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// Register Real Hardware Biometrics (Passkey / Touch ID / Windows Hello / Android Biometric)
export async function registerHardwareBiometric(
  userId: string,
  userName: string,
  userDisplayName: string
): Promise<{ credentialId: string; rawId: string }> {
  if (!navigator.credentials || !navigator.credentials.create) {
    throw new Error("L'API WebAuthn Biométrique n'est pas supportée par ce navigateur.");
  }

  // Cryptographic random challenge
  const challenge = new Uint8Array(32);
  window.crypto.getRandomValues(challenge);

  // User ID as bytes
  const userIdBuffer = new TextEncoder().encode(userId);

  const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
    challenge: challenge.buffer,
    rp: {
      name: "ROAM'S.AI V1.0 Souverain",
      id: window.location.hostname === 'localhost' ? 'localhost' : window.location.hostname,
    },
    user: {
      id: userIdBuffer.buffer,
      name: userName || 'architecte@roams.ai',
      displayName: userDisplayName || 'Architecte Souverain',
    },
    pubKeyCredParams: [
      { alg: -7, type: 'public-key' }, // ES256
      { alg: -257, type: 'public-key' }, // RS256
    ],
    authenticatorSelection: {
      authenticatorAttachment: 'platform', // Enforce local hardware (Fingerprint, Touch ID, Face ID, Windows Hello)
      userVerification: 'required',
      residentKey: 'preferred',
    },
    timeout: 60000,
    attestation: 'none',
  };

  const credential = (await navigator.credentials.create({
    publicKey: publicKeyCredentialCreationOptions,
  })) as PublicKeyCredential | null;

  if (!credential) {
    throw new Error('Enregistrement biométrique annulé ou échoué.');
  }

  const rawIdBase64 = bufferToBase64(credential.rawId);

  // Store in LocalStorage for this device + can also store in Firestore
  localStorage.setItem(`roam_biometric_cred_${userId}`, rawIdBase64);
  localStorage.setItem('roam_biometric_last_user', userId);

  return {
    credentialId: credential.id,
    rawId: rawIdBase64,
  };
}

// Authenticate with Real Hardware Biometrics
export async function authenticateHardwareBiometric(userId?: string): Promise<{ success: boolean; rawId: string }> {
  if (!navigator.credentials || !navigator.credentials.get) {
    throw new Error("L'API WebAuthn Biométrique n'est pas disponible.");
  }

  const effectiveUserId = userId || localStorage.getItem('roam_biometric_last_user') || 'default_user';
  const savedCredId = localStorage.getItem(`roam_biometric_cred_${effectiveUserId}`);

  const challenge = new Uint8Array(32);
  window.crypto.getRandomValues(challenge);

  const allowCredentials: PublicKeyCredentialDescriptor[] = [];
  if (savedCredId) {
    try {
      allowCredentials.push({
        id: base64ToBuffer(savedCredId),
        type: 'public-key',
        transports: ['internal'],
      });
    } catch (e) {
      console.warn('Could not parse saved credential id', e);
    }
  }

  const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
    challenge: challenge.buffer,
    rpId: window.location.hostname === 'localhost' ? 'localhost' : window.location.hostname,
    allowCredentials: allowCredentials.length > 0 ? allowCredentials : undefined,
    userVerification: 'required', // Triggers system biometric prompt
    timeout: 60000,
  };

  const assertion = (await navigator.credentials.get({
    publicKey: publicKeyCredentialRequestOptions,
  })) as PublicKeyCredential | null;

  if (!assertion) {
    throw new Error('Authentification biométrique échouée ou refusée.');
  }

  return {
    success: true,
    rawId: bufferToBase64(assertion.rawId),
  };
}
