export async function POST() {
  return new Response(
    JSON.stringify({ message: "Thank you for subscribing!" })
  );
}
