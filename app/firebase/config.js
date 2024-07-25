import { initializeApp, getApps, getApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDLCmASch8Tet2R1MDnt9skETz6s2ZiIY8",
    authDomain: "forem-c78dc.firebaseapp.com",
    projectId: "forem-c78dc",
    storageBucket: "forem-c78dc.appspot.com",
    messagingSenderId: "62561986265",
    appId: "1:62561986265:web:dd455856dba47ec90f00c8",
    measurementId: "G-9G3GJCB5GR"
  };

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)

export {app, auth}