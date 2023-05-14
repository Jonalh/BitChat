// next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  }
}
