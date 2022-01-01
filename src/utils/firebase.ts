import firebase from "firebase/app";
import "firebase/database";
import env from "~/utils/environment";

const app = !firebase.apps.length ? firebase.initializeApp(env.firebaseConfig) : firebase.app();
export default app;
