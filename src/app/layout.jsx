export const metadata = {
  title: 'KHG Command Center',
  description: 'The Kollective Hospitality Group Enterprise Command Center v3.0',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#f8f8fa' }}>{children}</body>
    </html>
  )
}
