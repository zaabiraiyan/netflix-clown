import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAd1VtXGLegDToP5mEsyfwZ7ZCOKrzMki0",
  authDomain: "netflix-clone-dee18.firebaseapp.com",
  projectId: "netflix-clone-dee18",
  storageBucket: "netflix-clone-dee18.appspot.com",
  messagingSenderId: "1083867118436",
  appId: "1:1083867118436:web:cae33c03db9f933b365871"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const googleauth= new GoogleAuthProvider()
export const database=getFirestore(app) 
