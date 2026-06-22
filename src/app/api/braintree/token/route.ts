import { NextRequest, NextResponse } from "next/server";
import { braintreeClientTokenFor, resolveInvestmentBraintree } from "@/lib/payments";
import { getSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const investmentId = req.nextUrl.searchParams.get("investmentId");
  if (!investmentId) {
    return NextResponse.json({ error: "Missing investmentId" }, { status: 400 });
  }
  // Resolve the merchant account (issuer group first, platform fallback).
  const resolved = await resolveInvestmentBraintree(investmentId);
  if (!resolved) {
    return NextResponse.json({ error: "Payment processing not configured" }, { status: 503 });
  }
  const clientToken = await braintreeClientTokenFor(resolved.creds);
  return NextResponse.json({ clientToken });
}
