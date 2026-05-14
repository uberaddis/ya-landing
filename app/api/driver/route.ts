import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import Driver from "@/models/Driver";


export async function POST(request: NextRequest) {
  await dbConnect();
  const { name, phone, backupPhone } = await request.json();

  const driverExists = await Driver.findOne({ phone });
  if (driverExists) {
    return NextResponse.json({ msg: "Driver already exists" }, { status: 400 });
  }

  const driver = await Driver.create({
    name,
    phone,
    backupPhone: backupPhone || ''
  });

  return NextResponse.json(
    {
      success: true,
      msg: `Driver Created Successfully`,
      driver,
    },
    { status: 201 }
  );
}
