'use client';

import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Instagram,
  MessageCircle,
  ShoppingBag,
  Plus,
  Minus,
  X,
  Check,
  Printer,
  Calendar,
  Receipt,
  Copy,
  Trash2,
  Bike,
  UtensilsCrossed,
  PackageCheck,
  FileDown,
} from 'lucide-react';

// ==========================================
// 1. بيانات مطعم حَرَم (النجف الأشرف)
// ==========================================
const RESTAURANT_DATA = {
  name: 'حَرَم',
  slogan: 'طعم واضح',
  phone: '07800004630',
  location: 'النجف الأشرف - المدينة القديمة / شارع الرسول',
  instagram: 'harm.iq',
  theme: {
    primary: '#9b1c22', // اللون العنابي من الشعار
    background: '#fdfbf7', // لون العاج الفاخر
  },
  menuCategories: [
    {
      title: 'شاورما دجاج',
      items: [
        { name: 'صاج', price: '3,000 د.ع' },
        { name: 'صمون فرنسي', price: '3,500 د.ع' },
      ],
    },
    {
      title: 'ريزو',
      items: [
        { name: 'ريزو دجاج', price: '5,000 د.ع' },
