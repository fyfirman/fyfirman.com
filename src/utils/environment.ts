const env = {
  title: process.env.NEXT_PUBLIC_TITLE ?? "Firmansyah Yanuar",
  metaDesc: process.env.NEXT_PUBLIC_META_DESC ?? "",
  firebaseConfig: {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  },
  cloudinary: {
    cloudName: process.env.CLOUD_NAME,
  },
};

export default env;
