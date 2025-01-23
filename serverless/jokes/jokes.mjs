// Docs on request and context https://docs.netlify.com/functions/build/#code-your-function-2
import { MongoClient } from "mongodb";

const C_MONGODB_API_KEY = process.env.MONGODB_API_KEY;

const uri = `mongodb+srv://alexgf2703:${C_MONGODB_API_KEY}@cluster0.r4lwh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; // Reemplaza con tu URI de conexión
const client = new MongoClient(uri);
const dbName = "website"; // Reemplaza con el nombre de tu base de datos
const collectionName = "contactos"; // Reemplaza con el nombre de tu colección


export default async (request, context) => {
  try {
    // Asegúrate de que el método sea POST
    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
      });
    }
    
    const body = await request.json();

    // Conectar a MongoDB
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Guardar el objeto en MongoDB
    const result = await collection.insertOne(body);

    return new Response(JSON.stringify({
      message: "Objeto guardado exitosamente",
      insertedId: result.insertedId,
    }), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
      message: "Error al procesar la solicitud",
      error: error.message,
    }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  } finally {
    // Cerrar la conexión a MongoDB
    await client.close();
  }
};

