import { Home, FileText, BookOpen, Users, FolderEdit, Package } from 'lucide-react';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="container mx-auto p-4 space-y-6 max-w-7xl pb-20 lg:pb-24">
      {/* Main Content */}
      {children}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t lg:border-t-0 lg:bg-transparent z-50">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center p-4 lg:justify-center lg:space-x-12 lg:p-6">
            <Link href="/" className="flex flex-col items-center text-xs lg:text-sm transition-colors duration-200 hover:text-primary focus:text-primary">
              <Home className="w-5 h-5 lg:w-6 lg:h-6 mb-1" />
              <span>Home</span>
            </Link>
            <Link  href="/transactions" className="flex flex-col items-center text-xs lg:text-sm transition-colors duration-200 hover:text-primary focus:text-primary">
              <FileText className="w-5 h-5 lg:w-6 lg:h-6 mb-1" />
              <span>Transaction</span>
            </Link>
            <Link href="/ledger" className="flex flex-col items-center text-xs lg:text-sm transition-colors duration-200 hover:text-primary focus:text-primary">
              <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 mb-1" />
              <span>Ledger</span>
            </Link>
            <Link href="/contacts" className="flex flex-col items-center text-xs lg:text-sm transition-colors duration-200 hover:text-primary focus:text-primary">
              <Users className="w-5 h-5 lg:w-6 lg:h-6 mb-1" />
              <span>Contacts</span>
            </Link>
            <Link href="/items" className="flex flex-col items-center text-xs lg:text-sm transition-colors duration-200 hover:text-primary focus:text-primary">
              <Package className="w-5 h-5 lg:w-6 lg:h-6 mb-1" />
              <span>Items</span>
            </Link>
           
          </div>
        </div>
      </nav>
    </div>
  );
}
