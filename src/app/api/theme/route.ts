import { getThemeConfig } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const theme = await getThemeConfig();
    return NextResponse.json(theme);
  } catch (error) {
    console.error("Failed to fetch theme:", error);
    return NextResponse.json(
      { error: "Failed to fetch theme" },
      { status: 500 }
    );
  }
}
