import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <footer className="text-center p-4 md:p-6 bg-gray-950 text-gray-400 border-t border-gray-800">
        <p>© 2024 True Feedback. All rights reserved.</p>
      </footer>
    </div>
  );
}
