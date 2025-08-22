// app/api/products/route.js
import clientPromise from "../../../lib/mongodb.js";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("e-shop");
  const data = await req.json();
  const result = await db.collection("products").insertOne(data);

  return new Response(JSON.stringify({ success: true, product: result }), { status: 201 });
}

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("e-shop");

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const latest = searchParams.get("latest");
    const id = searchParams.get('id')

    let filter = {};

    if (email) {
      filter.email = email; // get products by email
    }

    let cursor = db.collection("products").find(filter);

    if (latest === "true") {
      cursor = cursor.sort({ _id: -1 }).limit(8); // latest 6 products
    }
    if(id){
     const data = await db.collection('products').findOne({_id: new ObjectId(id)})
      return new Response(JSON.stringify(data))
    }

    const products = await cursor.toArray();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
