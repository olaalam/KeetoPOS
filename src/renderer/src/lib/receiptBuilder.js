// utils/receiptBuilder.js

export const buildReceiptHTML = (items, payment) => {
  const isArabic = false; // لو المشروع بيدعم عربي غيريها لـ true أو اسحبيها من الـ localStorage
  const cashierName = "Main User";
  const invoiceNumber = Math.floor(Math.random() * 100000);
  const dateObj = new Date();
  const dateFormatted = dateObj.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" });
  const timeFormatted = dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  
  const grandTotal = Number(payment.total).toFixed(2);
  const paidAmount = Number(payment.paidAmount || payment.total).toFixed(2);
  const changeAmount = (Number(paidAmount) - Number(grandTotal)).toFixed(2);

  // بناء صفوف المنتجات
  const itemsHTML = items.map((item) => {
    const itemTotal = (item.price * item.qty).toFixed(2);
    const unitPrice = Number(item.price).toFixed(2);

    return `
      <tr>
        <td class="item-qty">${item.qty}</td>
        <td class="item-name" style="text-align: ${isArabic ? "right" : "left"};">
          ${item.name}
        </td>
        <td class="item-price">${unitPrice}</td>
        <td class="item-total">${itemTotal}</td>
      </tr>
    `;
  }).join("");

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <style>
        /* 💡 تصفير شامل ومطلق لهوامش الطابعة لمنع أي ترحيل لليمين */
        @page { 
          margin: 0mm !important; 
          size: 80mm auto; 
        }
        
        @media print {
          html, body {
            width: 60mm !important; /* حجم آمن جداً يضمن عدم الخروج عن حواف الورقة */
            margin-left: 0 !important; /* إجبار المحتوى يبدأ من أقصى الشمال */
            margin-right: 0 !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body {
          width: 60mm;
          background-color: #fff;
          font-family: 'Arial', 'Tahoma', sans-serif;
          color: #000;
          direction: ${isArabic ? "rtl" : "ltr"};
          font-size: 11px;
          line-height: 1.3;
        }

        /* 💡 الحاوية الأساسية: صفرنا الـ padding الجانبي تماماً لمنع الترحيل يمين */
        .container {
          width: 100%;
          padding: 2mm 0mm; /* صفر مليمتر يمين وشمال عشان يستغل العرض بالكامل */
          margin: 0 !important;
          box-sizing: border-box;
        }

        /* 1. الترويسة */
        .header { text-align: center; margin-bottom: 6px; }
        .header h1 { 
            font-size: 18px; 
            font-weight: 900; 
            margin: 0; 
            text-transform: uppercase; 
        }
        .header p { margin: 1px 0; font-size: 10px; color: #000; }

        /* 2. شارة نوع الطلب */
        .order-badge {
            border: 1px solid #000;
            color: black;
            text-align: center;
            font-size: 12px;
            font-weight: bold;
            padding: 3px;
            margin: 5px 0;
            border-radius: 4px;
            text-transform: uppercase;
        }

        /* 3. شبكة معلومات الفاتورة */
        .meta-grid { 
            width: 100%; 
            table-layout: fixed;
            border-top: 1px dashed #000; 
            border-bottom: 1px dashed #000; 
            margin-bottom: 6px;
            padding: 4px 0;
            border-collapse: collapse;
        }
        .meta-grid td { vertical-align: top; }
        .meta-label { font-size: 9px; color: #000; }
        .meta-value { font-size: 11px; font-weight: bold; }
        
        .meta-col-1 { width: 45%; }
        .meta-col-2 { width: 55%; }

        /* 4. فواصل الأقسام */
        .section-header {
            background-color: #f2f2f2;
            border-top: 1px solid #000;
            border-bottom: 1px solid #000;
            color: #000;
            text-align: center;
            font-weight: bold;
            font-size: 10px;
            padding: 2px 0;
            margin: 4px 0;
            text-transform: uppercase;
        }

        /* 5. جدول المنتجات */
        .items-table { 
            width: 100%; 
            table-layout: fixed; 
            border-collapse: collapse; 
        }
        .items-table th { 
            font-size: 9px; 
            font-weight: bold;
            border-bottom: 1px solid #000; 
            padding-bottom: 3px;
        }
        .items-table td { 
            padding: 4px 0; 
            border-bottom: 1px dashed #ccc;
            vertical-align: middle;
            font-size: 11px;
            font-weight: bold;
            word-break: break-word; 
        }
        
        .item-qty { width: 12%; text-align: center; }
        .item-name { width: 48%; padding: 0 2px; }
        .item-price { width: 20%; text-align: center; }
        .item-total { width: 20%; text-align: ${isArabic ? "left" : "right"}; }

        /* 6. الحسابات والـ Grand Total */
        .totals-section {
            border-top: 1px solid #000; 
            margin-top: 5px; 
            padding-top: 4px;
        }
        
        .totals-row { 
            display: flex; 
            justify-content: space-between; 
            margin-bottom: 4px; 
            font-size: 11px; 
            font-weight: bold;
        }
        .totals-row span:last-child {
            flex-shrink: 0;
            padding-${isArabic ? "right" : "left"}: 2px;
        }
        
        .grand-total {
          border: 1px solid #000;
          padding: 5px;
          margin: 5px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #fff;
        }
        .grand-total span:first-child { font-size: 12px; font-weight: bold; }
        .grand-total span:last-child { 
          font-size: 14px; 
          font-weight: 900; 
          flex-shrink: 0;
          padding-${isArabic ? "right" : "left"}: 2px;
        }

        .footer {
            text-align: center; 
            margin-top: 10px; 
            font-size: 9px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        
        <div class="header">
          <h1>KEETO</h1>
          <p>Alexandria, Egypt</p>
        </div>

        <div class="order-badge">${isArabic ? "تيك أواي" : "TAKEAWAY"}</div>

        <table class="meta-grid">
          <tr>
            <td class="meta-col-1" style="border-${isArabic ? "left" : "right"}: 1px dotted #000; padding-${isArabic ? "left" : "right"}: 2px;">
              <div class="meta-label">${isArabic ? "رقم الفاتورة" : "ORDER NO"}</div>
              <div class="meta-value">#${invoiceNumber}</div>
            </td>
            <td class="meta-col-2" style="padding-${isArabic ? "right" : "left"}: 2px; text-align: ${isArabic ? "left" : "right"};">
              <div class="meta-label">${isArabic ? "التاريخ والوقت" : "DATE / TIME"}</div>
              <div style="font-weight: bold; font-size: 10px; white-space: nowrap;">${dateFormatted} | ${timeFormatted}</div>
              <div style="margin-top: 2px;">
                <span class="meta-label">${isArabic ? "الكاشير" : "Cashier"}:</span>
                <span style="font-weight: bold; font-size: 10px;">${cashierName}</span>
              </div>
            </td>
          </tr>
        </table>

        <div class="section-header">${isArabic ? "الطلبات" : "ITEMS"}</div>
        
        <table class="items-table">
          <thead>
            <tr>
              <th class="item-qty">${isArabic ? "ع" : "Qty"}</th>
              <th class="item-name" style="text-align: ${isArabic ? "right" : "left"};">${isArabic ? "الصنف" : "Item"}</th>
              <th class="item-price">${isArabic ? "سعر" : "Price"}</th>
              <th class="item-total" style="text-align: ${isArabic ? "left" : "right"};">${isArabic ? "إجمالي" : "Total"}</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <div class="totals-section">
          
          <div class="grand-total">
            <span>${isArabic ? "الإجمالي الكلي" : "GRAND TOTAL"}</span>
            <span>${grandTotal} EGP</span>
          </div>

          <div class="section-header">${isArabic ? "تفاصيل الدفع" : "PAYMENT DETAILS"}</div>
          
          <div class="totals-row">
            <span style="text-transform: uppercase;">${payment.method ? payment.method.replace('_', ' ') : 'CASH'}</span>
            <span>${paidAmount} EGP</span>
          </div>
          
          ${Number(changeAmount) > 0 ? `
          <div class="totals-row">
            <span>${isArabic ? "المتبقي" : "CHANGE"}</span>
            <span>${changeAmount} EGP</span>
          </div>` : ''}
          
        </div>
        
        <div class="footer">
          <div style="font-weight: bold; font-size: 10px; margin-bottom: 2px;">Powered by Keeto POS</div>
          <p>*** ${isArabic ? "شكراً لزيارتكم" : "Thank you for your visit"} ***</p>
        </div>

      </div>
    </body>
  </html>
  `;
};