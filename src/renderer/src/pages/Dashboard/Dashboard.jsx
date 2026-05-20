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

// 👇 استيراد دالة تصميم الريسيت من الملف المنفصل

const MOCK_PRODUCTS = [
  { id: 1, name: 'Strawberry Sundae Ice Cream', price: 45.00, category: 'Sundae', color: 'bg-pink-50 text-pink-500 border-pink-100' },
  { id: 2, name: 'Chocolate Chimney Cake', price: 65.00, category: 'Chimney', color: 'bg-amber-50 text-amber-700 border-amber-100' },
  { id: 3, name: 'Classic Waffle with Nutella', price: 55.00, category: 'new Items', color: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
  { id: 4, name: 'Ice Latte Caramel', price: 40.00, category: 'Favorite', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { id: 5, name: 'Vanilla Ice Cream Scoop', price: 30.00, category: 'Ice-cream', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { id: 6, name: 'Croissant Mix Cheese', price: 50.00, category: 'new breakfast', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
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
  const [orderDiscount, setOrderDiscount] = useState(0); // القيمة الافتراضية للخصم
  const [taxRate, setTaxRate] = useState(14); // ضريبة 14% كمثال
  const [serviceFee, setServiceFee] = useState(10);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingFreeAmount, setPendingFreeAmount] = useState(0);
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

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const isProductInCart = prevItems.find((item) => item.id === product.id);
      if (isProductInCart) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevItems, { ...product, qty: 1 }];
    });
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
    setCartItems(prev => [...prev, customizedProduct]);
    setIsModalOpen(false);
  };

  const handleProcessPayment = async (details) => {
    // 👇 استخدام الدالة من الملف المستورد
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
    if (password === '1234') { // استبدليها بباسوورد النظام الفعلي الخاص بك
      setOrderDiscount(pendingFreeAmount);
      setIsAuthModalOpen(false);
      alert('Discount applied successfully!');
    } else {
      alert('Incorrect password! Authorization failed.');
    }
  };

  // الحسابات المالية للوحة الـ Checkout
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
          <ControlBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            toggleType={toggleType}
            setToggleType={setToggleType}
            priceType={priceType}
            setPriceType={setPriceType}
          />

          <div className="flex-1 flex flex-col md:flex-row gap-4 lg:gap-6 overflow-visible lg:overflow-hidden">
            <CategorySidebar
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />

            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleOpenProductModal}
            />
          </div>
        </div>

        <div className="w-full lg:w-[360px] bg-white border-t lg:border-t-0 lg:border-l border-slate-200/80 flex flex-col justify-between overflow-hidden shadow-2xl shrink-0">
          <ActionGrid />
          <CartList
            cartItems={cartItems}
            onRemoveItem={(id, name) => triggerRemoveItemModal(id, name)}
            onClearCart={triggerClearCartModal}
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

          {/* مودال التحقق المنفصل */}
          <FreeAuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onConfirm={handleConfirmAuth}
          />
          <CheckoutModal
            isOpen={checkoutModalOpen}
            onClose={() => setCheckoutModalOpen(false)}
            totalAmount={calculateFinalTotal()} // 👈 تم تعديلها هنا لتأخذ الإجمالي الشامل
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