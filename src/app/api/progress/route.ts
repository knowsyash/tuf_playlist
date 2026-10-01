import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const user = await User.findById((session.user as any).id);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Map to plain object
    const solved = user.solved ? Object.fromEntries(user.solved) : {};
    return NextResponse.json({ solved });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { problemId, isSolved } = await req.json();
    if (!problemId) return NextResponse.json({ error: "Bad request" }, { status: 400 });

    await connectToDatabase();
    
    // Using dot notation to update the map field directly
    const updateQuery = isSolved 
      ? { $set: { [`solved.${problemId}`]: true } }
      : { $unset: { [`solved.${problemId}`]: "" } };

    await User.findByIdAndUpdate((session.user as any).id, updateQuery);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    await User.findByIdAndUpdate((session.user as any).id, { $set: { solved: {} } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
