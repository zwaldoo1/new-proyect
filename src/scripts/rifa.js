import { db } from "../../src/firebase/firebaseConfig.js";
import {
  collection,
  getDocs,
} from "firebase/firestore";

const TOTAL_NUMEROS = 10000;
const reservedNumbers = new Set();
const grid = document.getElementById("rifa-grid");

async function fetchReserved() {
  const snapshot = await getDocs(collection(db, "rifa_numeros"));
  snapshot.forEach((doc) => reservedNumbers.add(doc.id));
}

function createButton(num) {
  const btn = document.createElement("button");
  btn.textContent = num;
  btn.className = `py-1 px-2 rounded ${
    reservedNumbers.has(num.toString())
      ? "bg-red-400 cursor-not-allowed"
      : "bg-green-500 hover:bg-green-700"
  }`;
  btn.disabled = reservedNumbers.has(num.toString());
  btn.addEventListener("click", () => handleSelect(num));
  return btn;
}

async function handleSelect(num) {
  if (reservedNumbers.has(num.toString())) return;

  const confirmacion = window.confirm(`¿Confirmas comprar el número ${num}?`);
  if (!confirmacion) return;

  const res = await fetch("/api/pagar", {
    method: "POST",
    body: JSON.stringify({ numero: num }),
    headers: { "Content-Type": "application/json" },
  });

  const { init_point } = await res.json();
  window.location.href = init_point;
}

(async () => {
  await fetchReserved();
  for (let i = 1; i <= TOTAL_NUMEROS; i++) {
    const btn = createButton(i);
    grid.appendChild(btn);
  }
})();
