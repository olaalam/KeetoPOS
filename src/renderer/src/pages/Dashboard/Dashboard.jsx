import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ControlBar from './ControlBar';
import CategorySidebar from './CategorySidebar';
import ProductGrid from './ProductGrid';
import ActionGrid from './ActionGrid';
import CartList from './CartList';
import CartSummary from './CartSummary';

export default function DashboardPage() {
  const [activeCategory, setActiveCategory] = useState('Favorite');
  const [searchQuery, setSearchQuery] = useState('');
  const [toggleType, setToggleType] = useState('By Piece');

  // شاشات الـ POS الحقيقية هتحتاج الـ states دي بعدين:
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 text-slate-800 font-sans overflow-hidden select-none">

      {/* 1. الهيدر */}
      <Navbar />

      {/* 2. مساحة العمل الرئيسية */}
      <div className="flex-1 flex overflow-hidden">

        {/* الجزء الأيسر (التحكم، التصنيفات، المنتجات) */}
        <div className="flex-1 flex flex-col p-6 overflow-hidden space-y-6">

          <ControlBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            toggleType={toggleType}
            setToggleType={setToggleType}
          />

          <div className="flex-1 flex gap-6 overflow-hidden">
            <CategorySidebar
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />

            <ProductGrid products={products} />
          </div>

        </div>

        {/* الجزء الأيمن (الفاتورة والسلة) */}
        <div className="w-[360px] bg-white border-l border-slate-200/80 flex flex-col justify-between overflow-hidden shadow-2xl">
          <ActionGrid />
          <CartList cartItems={cartItems} />
          <CartSummary total={0} />
        </div>

      </div>
    </div>
  );
}