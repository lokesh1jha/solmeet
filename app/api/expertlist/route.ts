import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 10, 50); // Cap at 50
    const page = Math.max(Number(searchParams.get("page")) || 1, 1); // Minimum page 1
    const tags = searchParams.get("tags");
    const search = searchParams.get("search");
    const sortByPrice = searchParams.get("sortByPrice");

    const filters: any = {
        user: {
            role: "expert" // Only get users with expert role
        }
    };
    
    if (tags && tags.trim()) {
        const tagArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0);
        if (tagArray.length > 0) {
            filters.tags = {
                hasSome: tagArray,
            };
        }
    }
    
    if (search && search.trim()) {
        const searchTerm = search.trim();
        filters.OR = [
            { user: { name: { contains: searchTerm, mode: "insensitive" } } },
            { user: { bio: { contains: searchTerm, mode: "insensitive" } } },
            { tags: { hasSome: [searchTerm] } },
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
                        walletAddress: true,
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