import React from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <ol className="flex items-center flex-wrap gap-2 text-xs text-white/50">
        <li>
          <Link to="/" className="hover:text-[#FF7A00] transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-2">
              <span className="text-white/30" aria-hidden="true">/</span>
              {item.href && !isLast ? (
                <Link to={item.href} className="hover:text-[#FF7A00] transition-colors truncate max-w-[150px] sm:max-w-none">
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#FFD3A1] font-medium truncate max-w-[180px] sm:max-w-none">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
