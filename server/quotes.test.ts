import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  createQuoteRequest: vi.fn().mockResolvedValue({ id: 1 }),
  getQuoteRequests: vi.fn().mockResolvedValue([]),
  updateQuoteStatus: vi.fn().mockResolvedValue(undefined),
}));

// Mock the notification function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAuthenticatedContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email: "test@example.com",
      name: "Test User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("quotes.create", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a quote request with valid data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quotes.create({
      name: "Juan Pérez",
      email: "juan@example.com",
      phone: "9831234567",
      serviceType: "personal",
      origin: "Bacalar",
      destination: "Mérida",
      travelDate: "2025-01-15",
      passengers: 5,
      message: "Necesito transporte para mi equipo de trabajo",
    });

    expect(result).toEqual({ success: true, id: 1 });
  });

  it("creates a quote request for paqueteria service", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quotes.create({
      name: "María García",
      email: "maria@example.com",
      phone: "9839876543",
      serviceType: "paqueteria",
      origin: "Chetumal",
      destination: "Valladolid",
      packageDescription: "Cajas con documentos, 20kg aproximadamente",
    });

    expect(result).toEqual({ success: true, id: 1 });
  });

  it("rejects invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.quotes.create({
        name: "Test User",
        email: "invalid-email",
        phone: "9831234567",
        serviceType: "personal",
        origin: "Bacalar",
        destination: "Mérida",
      })
    ).rejects.toThrow();
  });

  it("rejects short phone number", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.quotes.create({
        name: "Test User",
        email: "test@example.com",
        phone: "123",
        serviceType: "personal",
        origin: "Bacalar",
        destination: "Mérida",
      })
    ).rejects.toThrow();
  });
});

describe("routes.list", () => {
  it("returns available routes", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const routes = await caller.routes.list();

    expect(routes).toHaveLength(6);
    expect(routes[0]).toHaveProperty("id");
    expect(routes[0]).toHaveProperty("origin");
    expect(routes[0]).toHaveProperty("destination");
    expect(routes[0]).toHaveProperty("distance");
    expect(routes[0]).toHaveProperty("duration");
  });

  it("includes Bacalar-Mérida route", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const routes = await caller.routes.list();
    const bacalarMerida = routes.find((r) => r.id === "bacalar-merida");

    expect(bacalarMerida).toBeDefined();
    expect(bacalarMerida?.origin).toBe("Bacalar");
    expect(bacalarMerida?.destination).toBe("Mérida");
  });
});
