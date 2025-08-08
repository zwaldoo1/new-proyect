import type { APIRoute } from 'astro';
import { db } from '../../lib/admin';

// GET → Obtener números NO reservados
export const GET: APIRoute = async () => {
  try {
    const snap = await db
      .collection('rifa_numeros')
      .where('reservado', '==', false)
      .get();

    const numerosDisponibles = snap.docs.map((d) => d.id);

    return new Response(JSON.stringify(numerosDisponibles), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error al obtener números:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST → Reservar un número (atómico con transacción)
export const POST: APIRoute = async ({ request }) => {
  try {
    const { numero } = await request.json();

    if (numero === undefined || numero === null) {
      return new Response(JSON.stringify({ error: 'Número no enviado' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const numeroId = String(numero);
    const numeroRef = db.collection('rifa_numeros').doc(numeroId);

    await db.runTransaction(async (tx) => {
      const docSnap = await tx.get(numeroRef);

      // si el doc no existe, lo creamos reservado
      if (!docSnap.exists) {
        tx.set(numeroRef, {
          reservado: true,
          fechaReserva: new Date().toISOString(),
        });
        return;
      }

      const data = docSnap.data() as { reservado?: boolean };
      if (data?.reservado === true) {
        throw new Error('number_already_reserved');
      }

      tx.update(numeroRef, {
        reservado: true,
        fechaReserva: new Date().toISOString(),
      });
    });

    return new Response(
      JSON.stringify({ mensaje: `Número ${numeroId} reservado con éxito` }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    if (error?.message === 'number_already_reserved') {
      return new Response(
        JSON.stringify({ error: `El número ${String((await request.json()).numero)} ya está reservado.` }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.error('❌ Error al reservar número:', error);
    return new Response(JSON.stringify({ error: 'Error al reservar número' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
