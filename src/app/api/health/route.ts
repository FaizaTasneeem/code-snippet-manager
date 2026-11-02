import { NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await db.execute(sql`SELECT 1`);

        return NextResponse.json(
            {
                status: "ok",
                database: "connected",
                timestamp: new Date().toISOString(),
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Supabase keep-alive failed:", error);
        return NextResponse.json(
            {
                status: "error",
                message: "Failed to connect to database",
            },
            { status: 500 }
        );
    }
}