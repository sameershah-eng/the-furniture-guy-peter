/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { WhatsAppButton } from './components/WhatsAppButton';
import { GlobalToast } from './components/GlobalToast';
import { IntroLoader } from './components/IntroLoader';
import { ScrollToTop } from './components/ScrollToTop';

import { Home } from './pages/Home';
import { RoomCollection } from './pages/RoomCollection';
import { RoomLook } from './pages/RoomLook';
import { FilterCategory } from './pages/FilterCategory';
import { Product } from './pages/Product';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { PaymentGateway } from './pages/PaymentGateway';
import { OrderConfirmed } from './pages/OrderConfirmed';
import { TrackOrder } from './pages/TrackOrder';
import { Enquiry } from './pages/Enquiry';
import { ThankYou } from './pages/ThankYou';
import { Wishlist } from './pages/Wishlist';
import { Account } from './pages/Account';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <IntroLoader />
      <div className="flex flex-col min-h-screen bg-black text-white selection:bg-[#FF7A00] selection:text-black">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Categories 1-3 Full Arrangements Flow */}
            <Route path="/collections/:categorySlug" element={<RoomCollection />} />
            <Route path="/collections/:categorySlug/:roomSlug" element={<RoomLook />} />
            
            {/* Categories 4-6 Filter Flow */}
            <Route path="/category/:categorySlug" element={<FilterCategory />} />
            
            {/* Product Detail Page */}
            <Route path="/product/:slug" element={<Product />} />
            
            {/* Order Path */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/payment" element={<PaymentGateway />} />
            <Route path="/order/:id" element={<OrderConfirmed />} />
            <Route path="/track/:id" element={<TrackOrder />} />
            
            {/* Enquiry Path */}
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/enquiry/thank-you" element={<ThankYou />} />
            
            {/* User & Atelier Portals */}
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/account" element={<Account />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Persistent Overlays */}
        <CartDrawer />
        <SearchOverlay />
        <WhatsAppButton />
        <GlobalToast />
      </div>
    </BrowserRouter>
  );
}
