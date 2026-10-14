import { auth } from "../Firebase/Firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";

const userEmail = document.getElementById("user-email");

const logoutButton = document.getElementById("logout-button");

onAuthStateChanged(auth, user => {
if (user && userEmail) {
    userEmail.textContent = user.displayName || user.email;
}
});

if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
        await signOut(auth);
            window.location.href = "login.html";
});
}