import { z } from "zod";


export const newInvoiceSchema = z.object({
  nombreCliente: z.string(),
  identificacionCliente: z.string().optional(),
  direccionCliente: z.string().optional(),
  rtnCliente: z.string().optional(),
  observaciones: z.string(),
  numeroOrdenCompraExenta: z.string(),
  numeroConstanciaRegistroExonerado: z.string(),
  numeroRegistroSag: z.string(),
  tipoPago: z.string(),
  descuentosRebajas: z.number(),
  items: z.array(
    z.object({
      cantidad: z.number(),
      descripcion: z.string(),
      precioUnitario: z.number(),
      ventasExentas: z.number(),
      ventasGravadas: z.number(),
      tipoImpuesto: z.string(),
    })
  ),
});

export type NewInvoiceType = z.infer<typeof newInvoiceSchema>;
