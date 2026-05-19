import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Check } from 'lucide-react';

export default function ControlBar({ 
  searchQuery, 
  setSearchQuery, 
  toggleType, 
  setToggleType,
  priceType,
  setPriceType
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Pricing models / Module groups
  const priceOptions = [
    {
      id: 'Normal Prices',
      name: 'Normal Prices',
      subtitle: 'Regular Menu Prices',
      shortLabel: 'Norm',
      logoText: 'Norm',
      colorClass: 'bg-slate-100 text-slate-600 border-slate-200',
      activeColor: 'bg-slate-50 border-slate-300'
    },
    {
      id: 'Talabat',
      name: 'Talabat',
      subtitle: 'ModuleGroupPricing',
      shortLabel: 'Talabat',
      logoText: 'Talabat',
      colorClass: 'bg-orange-100 text-orange-600 border-orange-200',
      activeColor: 'bg-orange-50/50 border-orange-300'
    },
    {
      id: 'Mrsool',
      name: 'Mrsool',
      subtitle: 'ModuleGroupPricing',
      shortLabel: 'Mrsool',
      logoText: 'Mrsool',
      colorClass: 'bg-green-100 text-green-600 border-green-200',
      activeColor: 'bg-green-50/50 border-green-300'
    },
    {
      id: 'HungerStation',
      name: 'HungerStation',
      subtitle: 'ModuleGroupPricing',
      shortLabel: 'Hunger',
      logoText: 'Hunger',
      colorClass: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      activeColor: 'bg-yellow-50/50 border-yellow-300'
    }
  ];

  // Get active selected option
  const activeOption = priceOptions.find(opt => opt.id === priceType) || priceOptions[0];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setPriceType(option.id);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm relative z-30">
      
      {/* Price Selection Dropdown with Custom Modules */}
      <div className="relative w-full md:w-auto md:min-w-[240px]" ref={dropdownRef}>
        
        {/* Active Selected Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between gap-3 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-primary active:scale-[0.99] transition-all text-left ${
            isOpen ? 'border-primary ring-2 ring-primary/5' : ''
          }`}
        >
          <div className="flex items-center gap-2.5">
            {/* Logo/Icon label on left */}
            <div className={`h-8 px-2 rounded-lg flex items-center justify-center text-[10px] font-black uppercase tracking-tight border ${activeOption.colorClass}`}>
              {activeOption.logoText}
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase leading-none">Price List</p>
              <p className="text-xs font-extrabold text-slate-800 mt-1">{activeOption.name}</p>
            </div>
          </div>
          
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          )}
        </button>

        {/* Dropdown Options Menu */}
        {isOpen && (
          <div className="absolute left-0 right-0 mt-2 rounded-2xl border border-slate-250/60 bg-white shadow-xl overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-3 duration-150 z-50">
            {priceOptions.map((option) => {
              const isSelected = option.id === priceType;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  className={`w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors text-left ${
                    isSelected ? 'bg-slate-50/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Logo/Icon on left inside dropdown */}
                    <div className={`h-9 w-16 rounded-xl flex items-center justify-center text-[9px] font-black uppercase tracking-tight border ${option.colorClass}`}>
                      {option.shortLabel}
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-slate-800">{option.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-0.5">{option.subtitle}</p>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="h-4 w-4 text-red-600 stroke-[3px]" />
                  )}
                </button>
              );
            })}
          </div>
        )}

      </div>

      {/* Search Input */}
      <div className="w-full md:flex-1 md:max-w-md relative">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      {/* Segmented Control Toggle */}
      <div className="w-full md:w-auto flex bg-slate-100 p-1 rounded-xl border border-slate-200">
        {['By Piece', 'By Weight'].map((type) => (
          <button
            key={type}
            onClick={() => setToggleType(type)}
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              toggleType === type
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

    </div>
  );
}