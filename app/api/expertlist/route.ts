import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit")) || 10;
    const page = Number(searchParams.get("page")) || 1;
    const tags = searchParams.get("tags");
    const search = searchParams.get("search");
    const sortByPrice = searchParams.get("sortByPrice");

    const filters: any = {};
    if (tags) {
        filters.tags = {
            hasSome: tags.split(","),
        };
    }
    if (search) {
        filters.OR = [
            { user: { name: { contains: search, mode: "insensitive" } } },
            { tags: { hasSome: search.split(",") } },
        ];
    }

    try {
        const experts = await prisma.expertProfile.findMany({
            where: filters,
            take: limit,
            skip: (page - 1) * limit,
            orderBy: sortByPrice ? { hourlyRate: sortByPrice === "asc" ? "asc" : "desc" } : undefined,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                        email: true,
                        bio: true,
                        image: true,
                    },
                },
            },
        });

        return NextResponse.json(experts);
    } catch (error) {
        console.error("Error fetching experts:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}