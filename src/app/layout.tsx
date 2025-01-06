import Providers from "./Providers";
import "./globals.css";

export const metadata = {
  title: "template for user registration",
  description: "template for user registration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
