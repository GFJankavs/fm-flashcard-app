import { Poppins } from "next/font/google";
import "./styles/index.css";
import { Metadata } from "next";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Frontend Mentor | Flashcard app",
    description: "A flashcard app to help you study and master new topics",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${poppins.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col bg-neutral-100">
                {children}
            </body>
        </html>
    );
}
