import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ControlBar from './ControlBar';
import CategorySidebar from './CategorySidebar';
import ProductGrid from './ProductGrid';
import ActionGrid from './ActionGrid';
import CartList from './CartList';
import CartSummary from './CartSummary';
import DeleteModal from '@/components/DeleteModal';
import ProductModal from '../ProductModal';
import CheckoutModal from '../CheckoutModal';
import ReceiptModal from '../ReceiptModal';
import { buildReceiptHTML } from '@/lib/receiptBuilder';
import FreeAuthModal from '../Discount/FreeAuthModal';
import { Heart, Sparkles, Percent, Layers, LayoutGrid } from 'lucide-react'; // استيراد الأيقونات للشبكة

const MOCK_PRODUCTS = [
  { id: 1, name: 'Strawberry Sundae Ice Cream', price: 45.00, category: 'Sundae', color: 'bg-pink-50 text-pink-500 border-pink-100' },
  { id: 2, name: 'Chocolate Chimney Cake', price: 65.00, category: 'Chimney', color: 'bg-amber-50 text-amber-700 border-amber-100' },
  { id: 3, name: 'Classic Waffle with Nutella', price: 55.00, category: 'new Items', color: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
  { id: 4, name: 'Ice Latte Caramel', price: 40.00, category: 'Favorite', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { id: 5, name: 'Vanilla Ice Cream Scoop', price: 30.00, category: 'Ice-cream', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { id: 6, name: 'Croissant Mix Cheese', price: 50.00, category: 'new breakfast', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
];

// مصفوفة التصنيفات الموحدة لتسهيل قراءتها واستخدامها في الحالتين
const CATEGORIES = [
  { id: 'Favorite', name: 'Favorite', icon: <Heart className="h-5 w-5 md:h-4 md:w-4 text-red-500 fill-red-500" />, color: 'from-red-50 to-red-100/50 text-red-600 border-red-200' },
  { id: 'new Items', name: 'New Items', icon: <Sparkles className="h-5 w-5 md:h-4 md:w-4 text-amber-500" />, color: 'from-amber-50 to-amber-100/50 text-amber-700 border-amber-200' },
  { id: 'new breakfast', name: 'New Breakfast', icon: <Percent className="h-5 w-5 md:h-4 md:w-4 text-indigo-500" />, color: 'from-indigo-50 to-indigo-100/50 text-indigo-600 border-indigo-200' },
  { id: 'Sundae', name: 'Sundae', icon: <Layers className="h-5 w-5 md:h-4 md:w-4 text-pink-500" />, color: 'from-pink-50 to-pink-100/50 text-pink-600 border-pink-200' },
];

export default function DashboardPage() {
  const [activeCategory, setActiveCategory] = useState('Favorite');
  const [searchQuery, setSearchQuery] = useState('');
  const [toggleType, setToggleType] = useState('By Piece');
  const [priceType, setPriceType] = useState('Normal Prices');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');
  const [orderDiscount, setOrderDiscount] = useState(0); 
  const [taxRate, setTaxRate] = useState(14); 
  const [serviceFee, setServiceFee] = useState(10);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingFreeAmount, setPendingFreeAmount] = useState(0);
  
  // 1. إضافة الـ State الخاص بوضعية العرض (normal أو grid)
  const [viewMode, setViewMode] = useState('normal');

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: 'single',
    selectedId: null,
    selectedName: ''
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'Favorite' ||
      product.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const triggerRemoveItemModal = (id, name) => {
    setModalConfig({ isOpen: true, type: 'single', selectedId: id, selectedName: name });
  };

  const triggerClearCartModal = () => {
    setModalConfig({ isOpen: true, type: 'all', selectedId: null, selectedName: '' });
  };

  const handleConfirmDelete = () => {
    if (modalConfig.type === 'single') {
      setCartItems((prevItems) =>
        prevItems
          .map((item) => (item.id === modalConfig.selectedId ? { ...item, qty: item.qty - 1 } : item))
          .filter((item) => item.qty > 0)
      );
    } else {
      setCartItems([]);
    }
    closeModal();
  };

  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  const handleOpenProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleConfirmCustomization = (customizedProduct) => {
    setCartItems((prevItems) => {
        const isProductInCart = prevItems.find((item) => item.id === customizedProduct.id);
        if (isProductInCart) {
            return prevItems.map((item) =>
                item.id === customizedProduct.id ? { ...customizedProduct } : item
            );
        }
        return [...prevItems, customizedProduct];
    });
    setIsModalOpen(false);
  };

  const handleProcessPayment = async (details) => {
    const receiptHTML = buildReceiptHTML(cartItems, details);
    setIsCheckoutOpen(false);
    setCheckoutModalOpen(false);

    if (window.api?.printReceipt) {
      try {
        const result = await window.api.printReceipt(receiptHTML);
        if (result.success) {
          console.log('✅ Receipt printed successfully');
        } else {
          console.error('❌ Print failed:', result.errorType);
        }
      } catch (err) {
        console.error('Print error:', err);
      }
    }
    setCartItems([]);
    setPaymentInfo(null);
  };

  const handleCloseReceipt = () => {
    setIsReceiptOpen(false);
    setCartItems([]);
    setPaymentInfo(null);
  };

  const handleOpenAuthModal = (amount) => {
    setPendingFreeAmount(amount);
    setIsAuthModalOpen(true);
  };

  const handleConfirmAuth = (password) => {
    if (password === '1234') { 
      setOrderDiscount(pendingFreeAmount);
      setIsAuthModalOpen(false);
      alert('Discount applied successfully!');
    } else {
      alert('Incorrect password! Authorization failed.');
    }
  };

  const calculateSubTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
  };

  const calculateFinalTotal = () => {
    const subTotal = calculateSubTotal();
    const taxAmount = subTotal * (taxRate / 100);
    return Math.max(0, (subTotal + taxAmount + serviceFee) - orderDiscount);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 text-slate-800 font-sans overflow-y-auto lg:overflow-hidden select-none">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row overflow-visible lg:overflow-hidden">
        <div className="flex-1 flex flex-col p-4 lg:p-6 overflow-visible lg:overflow-hidden space-y-4 lg:space-y-6">
          
          {/* تمرير الـ viewMode والـ setViewMode للـ ControlBar للتحكم بالتبديل */}
          <ControlBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            toggleType={toggleType}
            setToggleType={setToggleType}
            priceType={priceType}
            setPriceType={setPriceType}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {/* عرض المحتوى بناءً على الـ viewMode الحالي */}
          {viewMode === 'normal' ? (
            /* الشكل العادي: sidebar + products */
            <div className="flex-1 flex flex-col md:flex-row gap-4 lg:gap-6 overflow-visible lg:overflow-hidden">
              <CategorySidebar
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                categories={CATEGORIES}
              />

              <ProductGrid
                products={filteredProducts}
                onAddToCart={handleOpenProductModal}
              />
            </div>
          ) : (
            /* شاشة الـ Grid: بتعرض categories كـ grid كبير */
            <div className="flex-1 bg-white border border-slate-200/60 rounded-3xl p-6 overflow-y-auto">
              <div className="flex items-center gap-2 mb-6">
                <LayoutGrid className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="text-base font-black text-slate-800 leading-none">اختر تصنيف</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">اضغط على التصنيف لعرض منتجاته</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {CATEGORIES.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setViewMode('normal');
                    }}
                    className={`bg-gradient-to-br ${category.color} border p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 min-h-[140px]`}
                  >
                    <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                      {category.icon}
                    </div>
                    <span className="text-sm font-black tracking-wide">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* الجزء الأيمن (السلة والفاتورة) */}
        <div className="w-full lg:w-[360px] bg-white border-t lg:border-t-0 lg:border-l border-slate-200/80 flex flex-col justify-between overflow-hidden shadow-2xl shrink-0">
          <ActionGrid />
          <CartList
            cartItems={cartItems}
            onRemoveItem={(id, name) => triggerRemoveItemModal(id, name)}
            onClearCart={triggerClearCartModal}
            onOpenProductModal={handleOpenProductModal} 
          />
          <DeleteModal
            isOpen={modalConfig.isOpen}
            onClose={closeModal}
            onConfirm={handleConfirmDelete}
            itemName={modalConfig.selectedName}
            isAll={modalConfig.type === 'all'}
          />
          <ProductModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            product={selectedProduct}
            onConfirm={handleConfirmCustomization}
          />
          <CartSummary
            subTotal={calculateSubTotal()}
            taxRate={taxRate}
            serviceFee={serviceFee}
            discount={orderDiscount}
            notes={orderNotes}
            onNotesChange={setOrderNotes}
            onApplyDiscount={setOrderDiscount}
            onOpenAuthModal={handleOpenAuthModal}
            onCheckout={() => setCheckoutModalOpen(true)}
          />
          <FreeAuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onConfirm={handleConfirmAuth}
          />
          <CheckoutModal
            isOpen={checkoutModalOpen}
            onClose={() => setCheckoutModalOpen(false)}
            totalAmount={calculateFinalTotal()} 
            onPay={handleProcessPayment}
          />
          <ReceiptModal
            isOpen={isReceiptOpen}
            onClose={handleCloseReceipt}
            cartItems={cartItems}
            paymentDetails={paymentInfo}
          />
        </div>
      </div>
    </div>
  );
}