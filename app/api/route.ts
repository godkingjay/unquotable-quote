// Sample API route in Next.js

export async function GET(request: Request) {
	return new Response('Hello, World!', { headers: { 'Content-Type': 'text/plain' } });
}
