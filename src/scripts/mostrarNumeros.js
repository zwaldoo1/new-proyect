async function cargarNumeros() {
  const container = document.getElementById('numeros-container');

  // Obtener todos los números (1 a 10000)
  const totalNumeros = 10000;
  const numeros = Array.from({ length: totalNumeros }, (_, i) => i + 1);

  // Obtener los números reservados desde tu endpoint
  let reservados = [];
  try {
    const res = await fetch('/api/numeros-reservados.ts'); // Ruta del endpoint que mostraste
    reservados = await res.json();
  } catch (err) {
    console.error('Error al cargar números reservados:', err);
  }

  // Crear y mostrar los números
  numeros.forEach((numero) => {
    const boton = document.createElement('button');
    boton.textContent = numero;
    boton.className = `p-2 rounded border text-sm ${
      reservados.includes(numero.toString())
        ? 'bg-red-500 cursor-not-allowed text-white'
        : 'bg-green-500 hover:bg-green-600 text-white'
    }`;
    boton.disabled = reservados.includes(numero.toString());

    // Puedes agregar lógica de selección o compra aquí

    container.appendChild(boton);
  });
}

document.addEventListener('DOMContentLoaded', cargarNumeros);
