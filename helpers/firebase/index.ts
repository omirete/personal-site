import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";
import DataObjects from "../database";

// Your web app's Firebase configuration
const DB_URL = process.env.FIREBASE_DB_URL;
const FIREBASE_CONFIG = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

class MyDB {
    db: Database;
    app: FirebaseApp;
    data: DataObjects;
    constructor(options: FirebaseOptions, name?: string, db_url?: string) {
        // Initialize Firebase
        this.app = initializeApp(options, name);

        // Initialize Realtime Database and get a reference to the service
        this.db = getDatabase(this.app, db_url);

        this.data = new DataObjects(this.db);
    }
}

export const DB = new MyDB(FIREBASE_CONFIG, undefined, DB_URL);
