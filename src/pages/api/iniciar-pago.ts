import type { APIRoute } from 'astro';
import { db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { MercadoPagoConfig, Preference } from 'mercadopago';


const client = new MercadoPagoConfig({
  accessToken: 'APP_USR-5582373581608941-080422-888d269c0dff6debe7463c5d5583aa1b-577675843',
});

export const post: APIRoute = async ({ request }) => {
  try {
    const { numero } = await request.json();

    if (!numero) {
      return new Response(JSON.stringify({ error: 'Número no enviado' }), { status: 400 });
    }

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: numero.toString(),
            title: `Número rifa #${numero}`,
            quantity: 1 as number,
            unit_price: 1000 as number,
            currency_id: 'CLP', // moneda obligatoria
          },
        ],
        metadata: {
          numero: numero.toString(),
        },
        back_urls: {
          success: `${process.env.BASE_URL}/pago-exitoso?numero=${numero}`,
          failure: `${process.env.BASE_URL}/pago-fallido`,
          pending: `${process.env.BASE_URL}/pago-pendiente`,
        },
        auto_return: 'approved',
      },
    });

    await setDoc(doc(db, 'rifas_numeros', numero.toString()), {
      reservado: false,
      enProceso: true,
      fechaProceso: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ init_point: result.init_point }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al iniciar pago:', error);
    return new Response(JSON.stringify({ error: 'Error al iniciar pago' }), { status: 500 });
  }
};
