import {
  conversations,
  messages,
  users,
  type Conversation,
  type InsertConversation,
  type Message,
  type InsertMessage,
  type User,
  type InsertUser,
} from "../shared/schema.js";
import { db } from "./db.js";
import { eq, desc, or } from "drizzle-orm";

export interface IStorage {
  // User methods
  createUser(user: Omit<InsertUser, 'password'> & { passwordHash: string }): Promise<User>;
  getUserById(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByPhone(phone: string): Promise<User | undefined>;
  getUserByEmailOrPhone(emailOrPhone: string): Promise<User | undefined>;

  // Conversation methods
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  getConversation(id: string): Promise<Conversation | undefined>;
  getUserConversations(userId: string): Promise<Conversation[]>;

  // Message methods
  createMessage(message: InsertMessage): Promise<Message>;
  getMessagesByConversation(conversationId: string): Promise<Message[]>;
}

export class DatabaseStorage implements IStorage {
  async createUser(user: Omit<InsertUser, 'password'> & { passwordHash: string }): Promise<User> {
    const [newUser] = await db
      .insert(users)
      .values(user)
      .returning();
    return newUser;
  }

  async getUserById(id: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return user || undefined;
  }

  async getUserByPhone(phone: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.phone, phone));
    return user || undefined;
  }

  async getUserByEmailOrPhone(emailOrPhone: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.email, emailOrPhone),
          eq(users.phone, emailOrPhone)
        )
      );
    return user || undefined;
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const [conversation] = await db
      .insert(conversations)
      .values(insertConversation)
      .returning();
    return conversation;
  }

  async getUserConversations(userId: string): Promise<Conversation[]> {
    return db
      .select()
      .from(conversations)
      .where(eq(conversations.userId, userId))
      .orderBy(desc(conversations.createdAt));
  }

  async getConversation(id: string): Promise<Conversation | undefined> {
    const [conversation] = await db
      .select()
      .from(conversations)
      .where(eq(conversations.id, id));
    return conversation || undefined;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db
      .insert(messages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getMessagesByConversation(conversationId: string): Promise<Message[]> {
    return db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(messages.createdAt);
  }
}

export const storage = new DatabaseStorage();
