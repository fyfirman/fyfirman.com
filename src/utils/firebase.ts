import firebase from "firebase/app";
import "firebase/database";
import env from "~/utils/environment";

const app = firebase.initializeApp(env.firebaseConfig);

export default app;
