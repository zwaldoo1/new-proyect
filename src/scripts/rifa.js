import { db } from "../../firebase/firebaseConfig.js";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const TOTAL_NUMEROS = 10000;
const PAGE_SIZE = 100;
let currentMax = PAGE_SIZE;

const reservedNumbers = new Set();
const grid = document.getElementById("rifa-grid");
const loadMoreBtn = document.getElementById("load-more");

// Escucha los números reservados en tiempo real
function escucharReservados() {
  const q = query(collection(db, "rifas_numeros"), orderBy("numero"));

  onSnapshot(q, (snapshot) => {
    reservedNumbers.clear();
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.reservado) {
        reservedNumbers.add(doc.id); // ID es el número
      }
    });
    renderButtons();
  });
}

function renderButtons() {
  grid.innerHTML = "";

  for (let i = 1; i <= currentMax && i <= TOTAL_NUMEROS; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = `py-1 px-2 rounded w-full ${
      reservedNumbers.has(i.toString())
        ? "bg-red-400 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-700"
    }`;
    btn.disabled = reservedNumbers.has(i.toString());
    btn.addEventListener("click", () => handleSelect(i));
    grid.appendChild(btn);
  }

  loadMoreBtn.style.display =
    currentMax >= TOTAL_NUMEROS ? "none" : "inline-block";
}

async function handleSelect(num) {
  if (reservedNumbers.has(num.toString())) return;

  const confirmacion = window.confirm(`¿Confirmas comprar el número ${num}?`);
  if (!confirmacion) return;

  const res = await fetch("/api/iniciar-pago", {
    method: "POST",
    body: JSON.stringify({ numero: num }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (res.ok && data.init_point) {
    window.location.href = data.init_point;
  } else {
    alert("No se pudo iniciar el pago.");
  }
}

loadMoreBtn.addEventListener("click", () => {
  currentMax += PAGE_SIZE;
  if (currentMax > TOTAL_NUMEROS) currentMax = TOTAL_NUMEROS;
  renderButtons();
});

// Inicia escucha en tiempo real
escucharReservados();
