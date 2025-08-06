// src/pages/api/mercadopago-webhook.ts
import type { APIRoute } from 'astro';
import { db } from '../../lib/firebase';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Configuración de Mercado Pago con access token desde .env
const mercadopago = new MercadoPagoConfig({
  accessToken: import.meta.env.MP_ACCESS_TOKEN || '',
});

const paymentClient = new Payment(mercadopago);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    console.log('📦 Webhook recibido:', JSON.stringify(body, null, 2));

    if (body?.type === 'payment' && body?.data?.id) {
      const paymentId = body.data.id;

      // Usar cliente de pagos para obtener detalles
      const payment = await paymentClient.get({ id: paymentId });

      const status = payment.status;
      const metadata = payment.metadata;
      const payerEmail = payment.payer?.email;

      console.log('📄 Detalles del pago:', JSON.stringify(payment, null, 2));

      if (status === 'approved') {
        const numeroRifa = metadata?.numero_rifa;

        if (!numeroRifa || !payerEmail) {
          console.error('❌ Datos faltantes: numero_rifa o comprador');
          return new Response(JSON.stringify({ error: 'Datos incompletos' }), { status: 400 });
        }

        // Guardar en rifa_numeros
        await setDoc(
          doc(db, 'rifa_numeros', numeroRifa.toString()),
          {
            reservado: true,
            pagado: true,
            comprador: payerEmail,
          },
          { merge: true }
        );

        // Guardar también en numerosReservados
        await setDoc(doc(db, 'numerosReservados', numeroRifa.toString()), {
          numero: numeroRifa,
          comprador: payerEmail,
          fecha: Timestamp.fromDate(new Date()),
          paymentId,
          status,
        });

        console.log(`✅ Número ${numeroRifa} reservado exitosamente para ${payerEmail}`);
      }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error('🚨 Error en webhook:', error);
    return new Response(
      JSON.stringify({
        error: 'Error interno',
        detalle: error instanceof Error ? error.message : String(error),
      }),
      { status: 500 }
    );
  }
};
