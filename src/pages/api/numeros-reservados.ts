import type { APIRoute } from 'astro';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';

// GET → Obtener lista de números reservados
export const GET: APIRoute = async () => {
  try {
    const rifaCollection = collection(db, 'rifa_numeros');
    const snapshot = await getDocs(rifaCollection);

    const numerosReservados = snapshot.docs.map(doc => doc.id);

    return new Response(JSON.stringify(numerosReservados), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al obtener los números reservados:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST → Reservar un número
export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json() as { numero: string | number };
    const numero = data.numero;

    if (!numero) {
      return new Response(JSON.stringify({ error: 'Número no proporcionado' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const docRef = doc(db, 'rifa_numeros', numero.toString());
    await setDoc(docRef, {
      reservado: true,
      timestamp: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al reservar el número:', error);
    return new Response(JSON.stringify({ error: 'Error al reservar el número' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
