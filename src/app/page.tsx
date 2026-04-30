import { redirect } from 'next/navigation';

// Redirect root to default locale (Lithuanian)
export default function RootPage() {
  redirect('/lt');
}
