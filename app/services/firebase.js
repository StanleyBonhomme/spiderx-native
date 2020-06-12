import {
	APIKEY,
	AUTHDOMAIN,
	DATABASEURL,
	PROJECTID,
	STORAGEBUCKET,
	MESSAGESENDERID,
	APPID,
	MEASUREMENTID
} from "react-native-dotenv";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: APIKEY,
	authDomai: AUTHDOMAIN,
	databaseUrl: DATABASEURL,
	projectId: PROJECTID,
	storageBucket: STORAGEBUCKET,
	messaging: MESSAGESENDERID,
	appId: APPID,
	measurementId: MEASUREMENTID
};

firebase.initializeApp(config);

const db = firebase.firestore();

export default db;

export { firebase };
