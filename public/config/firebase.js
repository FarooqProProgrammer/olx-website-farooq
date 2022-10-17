// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js'
import { getFirestore, collection, addDoc,doc ,setDoc, query, where, getDocs,getDoc} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'



import {getStorage, ref ,uploadBytes,getDownloadURL} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEzfwBVTaidpP-7oN88XP3gUGHKHPSGhA",
  authDomain: "apps-155ad.firebaseapp.com",
  projectId: "apps-155ad",
  storageBucket: "apps-155ad.appspot.com",
  messagingSenderId: "928983237582",
  appId: "1:928983237582:web:222f4681e564977bbae19f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app)

const storage = getStorage(app);

const auth = getAuth(app);
let   a;
function signin( email, password){
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    localStorage.setItem("item", JSON.stringify (user));
    console.log(user );
    alert('Login SuccessFully')
    window.location = '../index.html'
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert("you don't have an account: First create your account")
    // window.location = '../index.html'


  });

}


function Register(userInfo){


  const {Email,Pass} = userInfo
  createUserWithEmailAndPassword(auth, Email, Pass)
  .then((userCredential) => {
    // Signed in 
    
    console.log("Adding Authentication: "+"success");
    const user = userCredential.user;
    addUser(userInfo,user.uid)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

}





function addUser(userInfo,userID){
  try {

    const {Name,Age,Email} = userInfo

    // const userId = auth.currentUser.uid

    setDoc(doc(firestore, "users", userID),{Name,Age,Email});
    console.log("Adding Authentication: "+"success");

  }catch(e){
    console.log('Error adding message: ',e)
  }
}



function addInfo(userInfo){

  const  {Address,image,title,area,price} = userInfo  
  // const userID = auth.currentUser.uid

  try{

    addDoc(collection(firestore, "ADDS"), {
      // userID,
      Address,
      image,
      title,
      area,
      price
    });

    console.log("Add Successfully")
    

  }catch(e){
    console.log("Error: " , e)
  }

}

// const booksRef = firebase.firestore().collection('ADDS');
var data = []
var id_data = []
async function getData(){
  // const q = query(collection(firestore, "ADDS"), where("title", "==", true));
  const colRef = collection(firestore, "ADDS");

  const docsSnap = await getDocs(colRef);
  docsSnap.forEach(doc => {
    // console.log(doc.data());
    data.push(doc.data())
    // console.log(data)
    id_data.push(doc.id)

    
})




return data 
}


function id_return(){
    return id_data
}

var id_data = []
async function singleitem(ID){
  

    const docref = doc(firestore,'ADDS',ID)
    let n = await getDoc(docref)
    let currentUser = n._document.data.value.mapValue.fields
    localStorage.setItem("current",JSON.stringify(currentUser))
    console.log(n._document.data.value.mapValue.fields);

    // let currentUser = n._document.data.value.mapValue.fields
    return n._document.data.value.mapValue.fields

    localStorage.setItem("current",JSON.stringify(currentUser))



}



async function uploadImage(image){
  const storageRef = ref(storage,`images/${image.name}`)
  const snapshot = await uploadBytes(storageRef,image)
  const url = await getDownloadURL(snapshot.ref)
  return url
}


async function getAdsFromDb() {
  const querySnapshot = await getDocs(collection(firestore, "ADDS"));
   const ads = [] 
   querySnapshot.forEach((doc) => {
      ads.push({ id: doc.id, ...doc.data() })
  }); return ads

}


export {
  id_return,
  signin ,
  Register,
  addInfo,
  getData,
  singleitem,
  id_data,
  uploadImage,
  getAdsFromDb
}