import "./globals.css";
import { koho } from "./fonts";

export const metadata = {
  title: "Future Eshop",
  description: "Future e-shop frontend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={koho.variable}>
      <body>{children}</body>
    </html>
  );
}
