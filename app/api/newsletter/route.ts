import { NextRequest, NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/newsletter";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, source } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, message: "Bitte gib eine E-Mail-Adresse ein." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Das sieht nicht nach einer gültigen E-Mail aus." },
        { status: 400 }
      );
    }

    const result = await subscribeToNewsletter(email, { firstName, source });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { success: false, message: "Da ist was schiefgelaufen. Versuch's nochmal?" },
      { status: 500 }
    );
  }
}
