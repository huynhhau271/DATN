// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
     getStorage,
     getDownloadURL,
     ref,
     uploadString,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
     apiKey: import.meta.env.FE_apiKey,
     authDomain: import.meta.env.FE_authDomain,
     projectId: import.meta.env.FE_projectId,
     storageBucket: import.meta.env.FE_STORAGEBUCKET,
     messagingSenderId: import.meta.env.FE_messagingSenderId,
     appId: import.meta.env.FE_appId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const uploadImageToFirebase = async (
     fileName: string,
     image: string,
     storageLoacation: string
) => {
     const typeFIle = fileName?.split(".")[1];
     const storageRef = ref(storage, `${storageLoacation}.${typeFIle}`);
     await uploadString(storageRef, image, "data_url");
     const fileUrl = await getDownloadURL(storageRef);
     return fileUrl;
};
