import { auth, db } from "../Firebase/Firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, getDoc, deleteDoc }
from "firebase/firestore";

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

onAuthStateChanged(auth, async user => {
    if (!user) {
        window.location.href = "login.html";
    return;
}
    await loadCart(user.uid);
});

async function loadCart(uid) {
    cartItems.innerHTML = "";

    let total = 0;
        const snapshot =
            await getDocs(collection(db, "users", uid, "cart"));
        for (const cartDoc of snapshot.docs) {
    const item = cartDoc.data();

    const productDoc =
        await getDoc(doc(db, "hoodies", item.productId));
            if (!productDoc.exists()) continue;
                const product = productDoc.data();

                const lineTotal =
                Number(product.price) * Number(item.quantity);
                total += lineTotal;

                const element = document.createElement("article");
                        element.innerHTML = `
                            <h2>${product.name}</h2>
                                <p>Quantity: ${item.quantity}</p>
                                        <p>R${lineTotal.toFixed(2)}</p>
                                                <button>Remove</button>
`;
element.querySelector("button").addEventListener("click",

async () => {
    await deleteDoc(
    doc(db, "users", uid, "cart", cartDoc.id)
);

loadCart(uid);
});

cartItems.appendChild(element);
}

cartTotal.textContent = total.toFixed(2);
}