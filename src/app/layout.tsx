export const metadata = { title: "KHG Command Center", description: "Kollective Hospitality Group Enterprise Dashboard" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body style={{ margin: 0 }}>{children}</body></html>;
}
