import type { APIRoute } from 'astro';
import { db } from '../../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export const post: APIRoute = async ({ request }) => {
  try {
    const { numero }: { numero: number } = await request.json();

    if (!numero) {
      return new Response(JSON.stringify({ error: 'Número no enviado' }), { status: 400 });
    }

    await setDoc(doc(db, 'rifas_numeros', numero.toString()), {
      reservado: true,
      fechaReserva: new Date().toISOString()
    });

    return new Response(JSON.stringify({ mensaje: `Número ${numero} reservado con éxito` }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error al reservar número' }), { status: 500 });
  }
};
