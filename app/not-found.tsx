import Link from 'next/link';
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Page Does Not Exist",
    description: "404",
};

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">Go back to Home</Link>
    </div>
  );
}