import type { APIRoute } from 'astro';
import { db } from '../../firebase/firebaseConfig.js';
import { collection, getDocs } from 'firebase/firestore';

export const GET: APIRoute = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'rifas_numeros'));
    const reservados = snapshot.docs
      .filter(doc => doc.data().reservado === true)
      .map(doc => doc.id);

    return new Response(
      JSON.stringify({
        reservados,
        total: 10000, // o usa una variable TOTAL_NUMEROS si prefieres
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error al obtener números de la rifa:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
};
