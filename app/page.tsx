"use client";

import React, { useState } from "react";
import {
  Utensils,
  Phone,
  Clock,
  MapPin,
  ChevronDown,
  ShoppingBag,
  Plus,
  Minus,
  MessageCircle,
} from "lucide-react";

export default function RestaurantMenu() {
  // بيانات المطعم (يمكنك جلبها من قاعدة بيانات لاحقاً)
  const restaurant = {
    name: "مطعم حَرَم",
    description: "أشهى المأكولات الشرقية والغربية",
    logo: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80",
    phone: "+9647860110475",
    hours: "11:00 صباحاً - 12:00 ليلاً",
    address: "النجف الأشرف - حي الجامعة",
  };

  // قائمة الطعام
  const menuCategories = [
    {
      id: "mains",
      name: "الأطباق الرئيسية",
      items: [
        {
          id: "1",
          name: "قوزي عراقي",
          description: "لحم غنم طازج مع الرز والمكسرات",
          price: 25000,
          image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80",
        },
        {
          id: "2",
          name: "برياني لحم",
          description: "رز برياني مع قطع اللحم والبطاطا",
          price: 15000,
          image: "https://images.unsplash.com/photo-1589302168068-964664d93cb0?w=400&q=80",
        },
      ],
    },
    {
      id: "grills",
      name: "المشاوي",
      items: [
        {
          id: "3",
          name: "كباب عراقي",
          description: "نفر كباب (4 أسياخ) مع الخبز الحار والخضروات",
          price: 12000,
          image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
        },
        {
          id: "4",
          name: "دجاج مشوي على الفحم",
          description: "دجاجة كاملة متبلة ومشوية",
          price: 18000,
          image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=400&q=80",
        },
      ],
    },
    {
      id: "drinks",
      name: "المشروبات",
      items: [
        {
          id: "5",
          name: "عصير برتقال فريش",
          description: "عصير برتقال طبيعي 100%",
          price: 3000,
          image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80",
        },
      ],
    },
  ];

  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [cart, setCart] = useState<{ item: any; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // دوال سلة المشتريات
  const addToCart = (item: any) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.item.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((cartItem) =>
          cartItem.item.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return prev.filter((cartItem) => cartItem.item.id !== itemId);
    });
  };

  const cartTotal = cart.reduce(
    (sum, { item, quantity }) => sum + item.price * quantity,
    0
  );
  const cartItemCount = cart.reduce((sum, { quantity }) => sum + quantity, 0);

  // دالة إرسال الطلب للواتساب
  const sendOrderToWhatsApp = () => {
    if (cart.length === 0) return;
    
    let message = `مرحباً مطعم ${restaurant.name}، أود طلب الآتي:\n\n`;
    cart.forEach(({ item, quantity }) => {
      message += `- ${item.name} (${quantity}x) = ${item.price * quantity} دينار\n`;
    });
    message += `\nالإجمالي: ${cartTotal} دينار`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${restaurant.phone}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-right font-sans pb-24" dir="rtl">
      
      {/* 1. رأس الصفحة (Header) */}
      <div className="relative h-64 bg-gray-900">
        <img
          src={restaurant.logo}
          alt={restaurant.name}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
          <p className="text-lg opacity-90">{restaurant.description}</p>
        </div>
      </div>

      {/* 2. معلومات المطعم (Info) */}
      <div className="bg-white px-4 py-6 shadow-sm mb-6 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4 text-orange-500" />
          <span>{restaurant.hours}</span>
        </div>
        <div className="flex items-center gap-1">
          <Phone className="w-4 h-4 text-orange-500" />
          <span dir="ltr">{restaurant.phone}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-orange-500" />
          <span>{restaurant.address}</span>
        </div>
      </div>

      {/* 3. شريط تصنيفات المنيو (Categories Tabs) */}
      <div className="sticky top-0 bg-white shadow-sm z-10 overflow-x-auto">
        <div className="flex px-4 py-3 gap-2 min-w-max">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === category.id
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* 4. عرض الوجبات (Menu Items) */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {menuCategories.map((category) => (
          <div
            key={category.id}
            className={`space-y-4 ${activeCategory === category.id ? "block" : "hidden"}`}
          >
            {category.items.map((item) => {
              const cartItem = cart.find((c) => c.item.id === item.id);
              const quantity = cartItem ? cartItem.quantity : 0;

              return (
                <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-orange-600">
                        {item.price.toLocaleString("ar-IQ")} د.ع
                      </span>
                      
                      {/* أزرار الإضافة للطلب */}
                      {quantity > 0 ? (
                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-white p-1 rounded-md shadow-sm text-orange-600"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-sm w-4 text-center">{quantity}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-orange-500 p-1 rounded-md shadow-sm text-white"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-orange-50 text-orange-600 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-orange-100"
                        >
                          إضافة
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 5. زر سلة المشتريات العائم (Floating Cart Button) */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent z-40">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full bg-orange-500 text-white rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-orange-500/30 font-bold"
            >
              <div className="flex items-center gap-2">
                <div className="bg-white text-orange-500 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  {cartItemCount}
                </div>
                <span>الطلبات</span>
              </div>
              <span>{cartTotal.toLocaleString("ar-IQ")} د.ع</span>
            </button>
          </div>
        </div>
      )}

      {/* 6. نافذة سلة المشتريات (Cart Modal) */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex flex-col justify-end transition-opacity">
          <div className="bg-white w-full rounded-t-3xl max-h-[85vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">سلة الطلبات</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 bg-gray-100 rounded-full text-gray-500"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              {cart.map(({ item, quantity }) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-sm">{item.name}</h4>
                      <p className="text-sm text-gray-500">{(item.price * quantity).toLocaleString("ar-IQ")} د.ع</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                    <button onClick={() => removeFromCart(item.id)} className="p-1 text-gray-600"><Minus className="w-4 h-4" /></button>
                    <span className="font-bold text-sm w-4 text-center">{quantity}</span>
                    <button onClick={() => addToCart(item)} className="p-1 text-orange-600"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t bg-gray-50 pb-8">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>المجموع الكلي:</span>
                <span>{cartTotal.toLocaleString("ar-IQ")} د.ع</span>
              </div>
              <button
                onClick={sendOrderToWhatsApp}
                className="w-full bg-green-500 text-white rounded-xl p-4 flex items-center justify-center gap-2 font-bold hover:bg-green-600 transition"
              >
                <MessageCircle className="w-5 h-5" />
                <span>إرسال الطلب عبر واتساب</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
