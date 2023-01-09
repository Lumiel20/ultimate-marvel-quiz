import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, where, query, getDocs } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJET_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,

};
//const db = getFirestore(app);
//const app = initializeApp(config)
//const auth = getAuth(app)

class Firebase {
  constructor() {
    this.app = initializeApp(config)
    this.auth = getAuth(this.app)
    this.db = getFirestore(this.app)
  }

  //inscription
  signupUser = async (payload) => {
    const { email, password, pseudo } = payload
    //console.log(userId);
    try {
      const data = await createUserWithEmailAndPassword(this.auth, email, password);
      sessionStorage.setItem('uid', data.user.uid)
      
      await this.creatUser({
        uid: data.user.uid,
        pseudo: pseudo,
        email: data.user.email
      })
    } catch (error) {
      console.log("Error while signing up the user...", error);
    }
  }

  //Connexion
  loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password)
      sessionStorage.setItem('uid', userCredential.user.uid)
    } catch (error) {
      console.log("Error while login the user...", error);
    }
  }

  //Deconnexion
  signOutUser = async () => this.auth.signOut()

  //Récupérer le mot de passe
  passwordReset = async (email) => sendPasswordResetEmail(this.auth, email)

  // uid = userId
  // creatUser = (uid) => doc(this.db, `users/${uid}`);

  creatUser = async (payload) => {
    try {
       await addDoc(collection(this.db, "users"), payload);
      //console.log("Document written with ID: ", docRef.id);

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async fetchUserData() {
    // You can await here

    //console.log("fetchUserDatas...... called");
    try {
      //firebase.user(userSession.uid)
      // const querySnapshot = await getDocs(collection(this.db, "users"));
      // console.log("users..", querySnapshot.docs);
      // querySnapshot.forEach((doc) => {
      //   console.log(`${doc.id} => ${doc.data()}`);
      // })

      const uid = sessionStorage.getItem('uid')
      //console.log(`id => ${uid}`);
      const q = query(collection(this.db, "users"), where("uid", "==", uid));
      const querySnapshotOne = await getDocs(q) ;

      const allData = [] 
      querySnapshotOne.forEach((doc) => allData.push(doc.data()))
      const data = allData[0]
      
      if (data) {
        const user = data;
        //console.log("user....", user);
        return user
      }
    } 
    catch (error) {
      console.log("error while fetching users..", error);
    }
  }
}

export default Firebase;