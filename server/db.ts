import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, quoteRequests, InsertQuoteRequest, QuoteRequest } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// In-memory mock store for when database is not available
const mockUsers = new Map<string, any>();
const mockQuotes: QuoteRequest[] = [];
let nextQuoteId = 1;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    const existing = mockUsers.get(user.openId) || {};
    mockUsers.set(user.openId, {
      ...existing,
      ...user,
      role: user.role ?? (user.openId === ENV.ownerOpenId ? "admin" : "user"),
      lastSignedIn: new Date(),
    });
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    return mockUsers.get(openId);
  }

  try {
    const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.warn("[Database] Query failed, falling back to mock user:", error);
    return mockUsers.get(openId);
  }
}

// Quote request functions
export async function createQuoteRequest(data: InsertQuoteRequest): Promise<{ id: number }> {
  const db = await getDb();
  if (!db) {
    const id = nextQuoteId++;
    const newQuote: QuoteRequest = {
      id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      serviceType: data.serviceType,
      origin: data.origin,
      destination: data.destination,
      travelDate: data.travelDate ?? null,
      passengers: data.passengers ?? null,
      packageDescription: data.packageDescription ?? null,
      message: data.message ?? null,
      status: "pendiente",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockQuotes.unshift(newQuote);
    return { id };
  }

  try {
    const result = await db.insert(quoteRequests).values(data);
    return { id: Number(result[0].insertId) };
  } catch (error) {
    console.warn("[Database] Insert failed, falling back to in-memory:", error);
    const id = nextQuoteId++;
    const newQuote: QuoteRequest = {
      id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      serviceType: data.serviceType,
      origin: data.origin,
      destination: data.destination,
      travelDate: data.travelDate ?? null,
      passengers: data.passengers ?? null,
      packageDescription: data.packageDescription ?? null,
      message: data.message ?? null,
      status: "pendiente",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockQuotes.unshift(newQuote);
    return { id };
  }
}

export async function getQuoteRequests(): Promise<QuoteRequest[]> {
  const db = await getDb();
  if (!db) {
    return [...mockQuotes];
  }

  try {
    return await db.select().from(quoteRequests).orderBy(desc(quoteRequests.createdAt));
  } catch (error) {
    console.warn("[Database] Query failed, falling back to in-memory:", error);
    return [...mockQuotes];
  }
}

export async function updateQuoteStatus(id: number, status: QuoteRequest["status"]): Promise<void> {
  const db = await getDb();
  if (!db) {
    const quote = mockQuotes.find((q) => q.id === id);
    if (quote) {
      quote.status = status;
      quote.updatedAt = new Date();
    }
    return;
  }

  try {
    await db.update(quoteRequests).set({ status }).where(eq(quoteRequests.id, id));
  } catch (error) {
    console.warn("[Database] Update failed, falling back to in-memory:", error);
    const quote = mockQuotes.find((q) => q.id === id);
    if (quote) {
      quote.status = status;
      quote.updatedAt = new Date();
    }
  }
}
