// app/page.js

import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to the /auth page
  redirect('/auth');
  
  // You can return some fallback UI or an empty component
  return null;
}
