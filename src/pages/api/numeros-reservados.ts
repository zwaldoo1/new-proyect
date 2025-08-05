import type { APIRoute } from 'astro';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs, query, where, doc, setDoc } from 'firebase/firestore';

// GET → Obtener números reservados
export const GET: APIRoute = async () => {
  try {
    const q = query(collection(db, 'rifas_numeros'), where('reservado', '==', false));
    const snapshot = await getDocs(q);
    const numerosReservados = snapshot.docs.map((doc) => doc.id); // ["1", "2", ...]

    return new Response(JSON.stringify(numerosReservados), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al obtener números reservados:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
    });
  }
};

// POST → Reservar un número
export const POST: APIRoute = async ({ request }) => {
  try {
    const { numero } = await request.json();

    if (!numero) {
      return new Response(JSON.stringify({ error: 'Número no enviado' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await setDoc(doc(db, 'rifas_numero', numero.toString()), {
      reservado: true,
      fechaReserva: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ mensaje: `Número ${numero} reservado con éxito` }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error al reservar número:', error);
    return new Response(JSON.stringify({ error: 'Error al reservar número' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
