import {db, auth} from "../firebase/firebase.js";
import { collection, getDocs, doc, getDoc, setDoc} from "firebase/firestore";

const productGrid = document.getElementById("product-grid");

// Function to fetch products from Firestore

const categoryFilter = document.getElementById("category-filter");
let products = [];

async function loadProducts() {}