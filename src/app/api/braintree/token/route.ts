import { NextResponse } from "next/server";
import { braintreeClientToken, isBraintreeConfigured } from "@/lib/payments";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isBraintreeConfigured()) {
    return NextResponse.json({ error: "Braintree not configured" }, { status: 503 });
  }
  const clientToken = await braintreeClientToken();
  return NextResponse.json({ clientToken });
}
