import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createQuoteRequest, getQuoteRequests, updateQuoteStatus } from "./db";
import { notifyOwner } from "./_core/notification";

// Rutas disponibles
const ROUTES = [
  { id: "bacalar-merida", origin: "Bacalar", destination: "Mérida", distance: "320 km", duration: "4-5 horas" },
  { id: "merida-bacalar", origin: "Mérida", destination: "Bacalar", distance: "320 km", duration: "4-5 horas" },
  { id: "bacalar-chetumal", origin: "Bacalar", destination: "Chetumal", distance: "40 km", duration: "45 min" },
  { id: "chetumal-bacalar", origin: "Chetumal", destination: "Bacalar", distance: "40 km", duration: "45 min" },
  { id: "bacalar-valladolid", origin: "Bacalar", destination: "Valladolid", distance: "200 km", duration: "2.5-3 horas" },
  { id: "valladolid-bacalar", origin: "Valladolid", destination: "Bacalar", distance: "200 km", duration: "2.5-3 horas" },
];

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  routes: router({
    list: publicProcedure.query(() => ROUTES),
  }),

  quotes: router({
    create: publicProcedure
      .input(z.object({
        name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
        email: z.string().email("Email inválido"),
        phone: z.string().min(10, "Teléfono debe tener al menos 10 dígitos"),
        serviceType: z.enum(["personal", "paqueteria", "ambos"]),
        origin: z.string().min(1, "Seleccione un origen"),
        destination: z.string().min(1, "Seleccione un destino"),
        travelDate: z.string().optional(),
        passengers: z.number().optional(),
        packageDescription: z.string().optional(),
        message: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const result = await createQuoteRequest(input);
        
        // Notify owner about new quote request
        await notifyOwner({
          title: "Nueva solicitud de cotización",
          content: `${input.name} solicita cotización para ${input.serviceType === "personal" ? "transporte de personal" : input.serviceType === "paqueteria" ? "paquetería" : "transporte y paquetería"} de ${input.origin} a ${input.destination}. Contacto: ${input.phone} / ${input.email}`,
        });
        
        return { success: true, id: result.id };
      }),

    list: protectedProcedure.query(async () => {
      return await getQuoteRequests();
    }),

    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pendiente", "contactado", "cotizado", "cerrado"]),
      }))
      .mutation(async ({ input }) => {
        await updateQuoteStatus(input.id, input.status);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
