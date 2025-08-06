import type { APIRoute } from 'astro';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, where, doc, setDoc, getDoc } from 'firebase/firestore';

// GET → Obtener números NO reservados
export const GET: APIRoute = async () => {
  try {
    const q = query(collection(db, 'rifa_numeros'), where('reservado', '==', false));
    const snapshot = await getDocs(q);
    const numerosDisponibles = snapshot.docs.map((doc) => doc.id);

    return new Response(JSON.stringify(numerosDisponibles), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error al obtener números:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
    });
  }
};

// POST → Reservar un número (si está disponible)
export const POST: APIRoute = async ({ request }) => {
  try {
    const { numero } = await request.json();

    if (!numero) {
      return new Response(JSON.stringify({ error: 'Número no enviado' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const numeroRef = doc(db, 'rifa_numeros', numero.toString());
    const docSnap = await getDoc(numeroRef);

    if (docSnap.exists() && docSnap.data().reservado === true) {
      return new Response(JSON.stringify({ error: `El número ${numero} ya está reservado.` }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await setDoc(
      numeroRef,
      {
        reservado: true,
        fechaReserva: new Date().toISOString(),
      },
      { merge: true }
    );

    return new Response(
      JSON.stringify({ mensaje: `Número ${numero} reservado con éxito` }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('❌ Error al reservar número:', error);
    return new Response(JSON.stringify({ error: 'Error al reservar número' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
