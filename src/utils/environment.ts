interface Environment {
  title: string;
  metaDesc: string;
  firebaseConfig: Partial<{
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
    gtmId: string;
    gtmAuth: string;
    gtmEnvId: string;
  }>;
  backendUrl: string;
  scraperServiceUrl: string;
  serverSide: {
    phoneNumber: string;
    allowedRef: string[];
  };
  featureFlags: {
    photoProfileV2: boolean;
  };
}

const env: Environment = {
  title: process.env.NEXT_PUBLIC_TITLE ?? "Firmansyah Yanuar",
  metaDesc: process.env.NEXT_PUBLIC_META_DESC ?? "",
  firebaseConfig: {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
    gtmId: process.env.NEXT_PUBLIC_GTM_ID,
    gtmAuth: process.env.NEXT_PUBLIC_GTM_AUTH,
    gtmEnvId: process.env.NEXT_PUBLIC_GTM_ENV_ID,
  },
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL ?? "",
  scraperServiceUrl: process.env.NEXT_PUBLIC_SCRAPER_SERVICE_URL ?? "http://localhost:3000",
  serverSide: {
    phoneNumber: process.env.PHONE_NUMBER ?? "+6281234567890",
    allowedRef: process.env.ALLOWED_REF?.split(",") ?? [],
  },
  featureFlags: {
    photoProfileV2: process.env.FF_PHOTO_PROFILE_V2?.toLowerCase() === "true",
  },
};

export default env;
