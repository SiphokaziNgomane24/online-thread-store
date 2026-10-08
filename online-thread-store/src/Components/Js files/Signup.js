import { auth, db } from "../firebase/firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  const confirmPassword = e.target.confirmPassword.value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCredential.user, { displayName: name });

    const userDocRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userDocRef, {
      name: name,
      email: email,
    });

    alert("Account created successfully");
    window.location.href = "shop.html";
  } catch (error) {
    console.error(error);
    alert("Error creating account: " + error.message);
  }
});