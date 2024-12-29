import './globals.css'
import Nav from '@/components/nav/Nav.js'
export const metadata = {
  title: "Directus flow installer",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={``}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
