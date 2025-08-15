import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>
    <nav>
        <Link href="/dashboard">Profile</Link>
        <Link href="/dashboard/orders">Orders</Link>
    </nav>
    {children}
    </main>;
}
