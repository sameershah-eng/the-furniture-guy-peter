import React, { useState } from 'react';
import {
  Lock,
  Package,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  LogOut,
  Sparkles,
  MapPin,
  Save,
  CheckCircle2,
  Plus,
} from 'lucide-react';
import { useStore, OrderStatus } from '../store/useStore';
import { rooms as initialRooms, RoomLook } from '../data/rooms';
import { categories } from '../data/categories';
import { formatPrice } from '../utils/formatPrice';

export const Admin: React.FC = () => {
  const {
    adminAuthenticated,
    adminLogin,
    adminLogout,
    orders,
    updateOrderStatus,
    enquiries,
    updateEnquiryStatus,
    getProductList,
    updateProductPriceAndStock,
    showToast,
  } = useStore();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'enquiries' | 'products' | 'hotspots'>('overview');

  // Hotspots and Room editor state
  const [selectedRoomId, setSelectedRoomId] = useState<string>(initialRooms[0].id);
  const [roomList, setRoomList] = useState<RoomLook[]>(initialRooms);
  const [newStyleTitle, setNewStyleTitle] = useState('');
  const [newStyleImage, setNewStyleImage] = useState('');
  const [newStyleCategory, setNewStyleCategory] = useState<'living-room' | 'dining-room' | 'bedroom'>('living-room');

  // Product price & stock edit state
  const currentProducts = getProductList();
  const [editPriceMap, setEditPriceMap] = useState<Record<string, number>>({});
  const [editStockMap, setEditStockMap] = useState<Record<string, number>>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const ok = adminLogin(username, password);
    if (!ok) {
      setLoginError('Invalid credentials. Use admin / admin123');
    }
  };

  if (!adminAuthenticated) {
    return (
      <div className="bg-black text-white min-h-screen pt-28 pb-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#111111] border-2 border-white/20 rounded-3xl p-8 space-y-6 shadow-2xl hard-shadow">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-signature text-black font-serif italic font-bold text-3xl flex items-center justify-center hard-shadow mb-3">
              TFG
            </div>
            <h1 className="font-serif text-3xl font-bold text-white">Atelier Management</h1>
            <p className="text-xs text-white/50">Enter credentials to manage commissions, leads, and inventory</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-white/70 font-medium">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-white/70 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>

            {loginError && <p className="text-xs text-rose-400 text-center">{loginError}</p>}

            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-white/50 space-y-0.5">
              <p>Demo credentials pre-filled:</p>
              <p><strong className="text-white">User:</strong> admin · <strong className="text-white">Pass:</strong> admin123</p>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hard-shadow shadow-xl hover:brightness-110"
            >
              <Lock className="w-4 h-4" />
              <span>Log In to Atelier</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Calculate Overview Stats
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalOrdersCount = orders.length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;
  const lowStockCount = currentProducts.filter((p) => p.stock < 5).length;

  const activeRoom = roomList.find((r) => r.id === selectedRoomId) || roomList[0];

  const handleSaveProductRow = (prodId: string) => {
    const p = currentProducts.find((item) => item.id === prodId);
    if (!p) return;
    const newPrice = editPriceMap[prodId] !== undefined ? editPriceMap[prodId] : p.price;
    const newStock = editStockMap[prodId] !== undefined ? editStockMap[prodId] : p.stock;
    updateProductPriceAndStock(prodId, newPrice, newStock);
  };

  const handleAddNewRoomStyle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStyleTitle.trim() || !newStyleImage.trim()) return;

    const newRoom: RoomLook = {
      id: `room-custom-${Date.now()}`,
      slug: newStyleTitle.toLowerCase().replace(/\s+/g, '-'),
      title: newStyleTitle,
      subtitle: 'Custom London Atelier Arrangement',
      categorySlug: newStyleCategory,
      style: 'Luxury',
      fullRoomImage: newStyleImage,
      description: 'Newly uploaded bespoke style look for our client catalogue.',
      productIds: ['prod-lr-1', 'prod-lr-2', 'prod-lr-3'],
      hotspots: [
        { id: `hs-cust-1`, productId: 'prod-lr-1', x: 50, y: 55, label: 'Centerpiece' },
      ],
    };

    setRoomList([newRoom, ...roomList]);
    setSelectedRoomId(newRoom.id);
    setNewStyleTitle('');
    setNewStyleImage('');
    showToast('New room arrangement published to catalogue.');
  };

  const handleImageClickToPlaceHotspot = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    const firstProduct = currentProducts[0];
    const newHs = {
      id: `hs-${Date.now()}`,
      productId: firstProduct.id,
      x,
      y,
      label: firstProduct.name,
    };

    const updatedRooms = roomList.map((r) => {
      if (r.id === activeRoom.id) {
        return {
          ...r,
          hotspots: [...r.hotspots, newHs],
        };
      }
      return r;
    });

    setRoomList(updatedRooms);
    showToast(`Added hotspot at (${x}%, ${y}%) for ${firstProduct.name}`);
  };

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Bar with Logout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-signature text-black font-serif italic font-bold text-xl flex items-center justify-center hard-shadow">
              TFG
            </span>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#FFD3A1]">Staff Portal</span>
              <h1 className="font-serif text-3xl font-bold text-white">London Atelier Dashboard</h1>
            </div>
          </div>

          <button
            onClick={adminLogout}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-rose-500 hover:text-black transition-colors text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 scrollbar-none">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: TrendingUp },
            { id: 'orders', label: `Orders (${orders.length})`, icon: Package },
            { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: MessageSquare },
            { id: 'products', label: `Products & Stock (${currentProducts.length})`, icon: Save },
            { id: 'hotspots', label: 'Room Hotspot Editor', icon: MapPin },
          ].map((tab) => {
            const active = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase whitespace-nowrap flex items-center gap-2 transition-all ${
                  active
                    ? 'bg-[#FF7A00] text-black font-bold hard-shadow'
                    : 'bg-[#141414] text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW METRIC CARDS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-2 hard-shadow">
                <span className="text-xs uppercase tracking-wider text-white/50">Total Gross Revenue</span>
                <p className="font-mono text-3xl font-bold text-gradient-orange">{formatPrice(totalRevenue)}</p>
                <span className="text-[11px] text-emerald-400">Captured via 3D Secure</span>
              </div>

              <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-2 hard-shadow">
                <span className="text-xs uppercase tracking-wider text-white/50">Total Orders</span>
                <p className="font-mono text-3xl font-bold text-white">{totalOrdersCount}</p>
                <span className="text-[11px] text-[#FFD3A1]">London & Nationwide delivery</span>
              </div>

              <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-2 hard-shadow">
                <span className="text-xs uppercase tracking-wider text-white/50">Active Enquiries</span>
                <p className="font-mono text-3xl font-bold text-white">{newEnquiriesCount}</p>
                <span className="text-[11px] text-amber-400">Awaiting concierge callback</span>
              </div>

              <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-2 hard-shadow">
                <span className="text-xs uppercase tracking-wider text-white/50">Low Stock Pieces</span>
                <p className="font-mono text-3xl font-bold text-rose-400">{lowStockCount}</p>
                <span className="text-[11px] text-white/40">Under 5 units in workshop</span>
              </div>
            </div>

            {/* Quick action jump */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#161616] to-[#0D0D0D] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-serif text-xl text-white">Live Client Commissions Awaiting Dispatch</h3>
                <p className="text-xs text-white/60">Manage order statuses to notify customers via automated SMS & WhatsApp.</p>
              </div>
              <button
                onClick={() => setActiveTab('orders')}
                className="px-6 py-3 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-wider hard-shadow"
              >
                Inspect Orders →
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS LIST & STATUS UPDATES */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-serif text-2xl text-white">Customer Orders ({orders.length})</h2>
                <p className="text-xs text-white/50">
                  Changing status here automatically triggers simulated customer SMS & WhatsApp notifications and updates the customer's live tracking view.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-4 hard-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-base font-bold text-white">Order #{ord.id}</span>
                        <span className="text-xs text-white/50">{ord.date}</span>
                        <span className="text-xs text-[#FFD3A1]">Paid via {ord.paymentMethod}</span>
                      </div>
                      <p className="text-xs text-white/70">
                        Client: <strong className="text-white">{ord.customer.fullName}</strong> ({ord.customer.phone}) · {ord.customer.city}, {ord.customer.postcode}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xl font-bold text-gradient-orange">
                        {formatPrice(ord.total)}
                      </span>

                      {/* Order Status Dropdown */}
                      <div className="flex items-center gap-2 bg-black px-3 py-1.5 rounded-xl border border-white/20">
                        <span className="text-xs text-white/50">Status:</span>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="bg-transparent text-xs font-bold font-mono text-[#FF7A00] focus:outline-none cursor-pointer"
                        >
                          <option value="Confirmed" className="bg-black text-white">Confirmed</option>
                          <option value="Packed" className="bg-black text-white">Packed</option>
                          <option value="Dispatched" className="bg-black text-white">Dispatched</option>
                          <option value="Delivered" className="bg-black text-white">Delivered</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {ord.items.map((item) => (
                      <div key={item.cartItemId} className="flex gap-3 items-center p-2 rounded-xl bg-black/50 border border-white/5">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-lg object-cover bg-neutral-900 border border-white/10 shrink-0"
                        />
                        <div className="min-w-0 flex-1 text-xs">
                          <p className="font-medium text-white truncate">{item.product.name}</p>
                          <p className="text-[11px] text-white/50 truncate">Qty: {item.quantity} · {item.finish} · {item.size}</p>
                          <p className="font-mono font-bold text-white/80">{formatPrice(item.unitPrice * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ENQUIRIES LIST */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl text-white">Bespoke Enquiries & Leads ({enquiries.length})</h2>
              <p className="text-xs text-white/50">Captured from the product pages, bespoke form, and WhatsApp concierge.</p>
            </div>

            <div className="space-y-4">
              {enquiries.map((enq) => (
                <div key={enq.id} className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-3 hard-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-lg font-bold text-white">{enq.name}</span>
                        <span className="text-xs text-white/50 font-mono">({enq.date})</span>
                      </div>
                      <p className="text-xs text-[#FFD3A1]">
                        Tel: {enq.phone} · Email: {enq.email || 'N/A'} · City: {enq.city}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={enq.status}
                        onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                        className="bg-black border border-white/20 text-xs px-3 py-1.5 rounded-lg text-white focus:outline-none"
                      >
                        <option value="New">Status: New Lead</option>
                        <option value="Contacted">Status: Contacted</option>
                        <option value="Resolved">Status: Resolved / Booked</option>
                      </select>
                    </div>
                  </div>

                  {enq.productName && (
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs text-white/80">
                      Piece: <strong className="text-[#FF7A00]">{enq.productName}</strong>
                      {enq.productPrice && <span className="ml-2 font-mono">({formatPrice(enq.productPrice)})</span>}
                    </div>
                  )}

                  <p className="text-xs text-white/70 bg-[#161616] p-3 rounded-xl border border-white/5">
                    "{enq.message}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EDITABLE PRODUCTS & STOCK TABLE */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl text-white">Product Catalogue & Live Inventory</h2>
              <p className="text-xs text-white/50">Edit retail price and workshop stock in real time. Changes reflect immediately across the entire store.</p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111111] hard-shadow">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 uppercase tracking-wider text-[10px] bg-black/60">
                    <th className="p-4">Piece</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Current Price (£)</th>
                    <th className="p-4">Stock Units</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {currentProducts.map((p) => {
                    const priceVal = editPriceMap[p.id] !== undefined ? editPriceMap[p.id] : p.price;
                    const stockVal = editStockMap[p.id] !== undefined ? editStockMap[p.id] : p.stock;

                    return (
                      <tr key={p.id} className="hover:bg-white/5">
                        <td className="p-4 flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover bg-neutral-900 border border-white/10 shrink-0"
                          />
                          <div>
                            <span className="font-serif text-sm font-semibold text-white block">{p.name}</span>
                            <span className="text-[10px] text-white/40">{p.type}</span>
                          </div>
                        </td>
                        <td className="p-4 text-white/70 capitalize">{p.category.replace('-', ' ')}</td>
                        <td className="p-4">
                          <input
                            type="number"
                            value={priceVal}
                            onChange={(e) =>
                              setEditPriceMap({ ...editPriceMap, [p.id]: Number(e.target.value) })
                            }
                            className="w-24 bg-black border border-white/20 rounded-lg px-2.5 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-[#FF7A00]"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="number"
                            value={stockVal}
                            onChange={(e) =>
                              setEditStockMap({ ...editStockMap, [p.id]: Number(e.target.value) })
                            }
                            className="w-20 bg-black border border-white/20 rounded-lg px-2.5 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-[#FF7A00]"
                          />
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleSaveProductRow(p.id)}
                            className="px-3 py-1.5 rounded-lg bg-[#FF7A00] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95"
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: ROOM HOTSPOT EDITOR & ADD STYLE PHOTO */}
        {activeTab === 'hotspots' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl text-white">Interactive Room Hotspot Editor</h2>
                <p className="text-xs text-white/50">
                  Select an arrangement and click anywhere on the photo to tag a furniture hotspot coordinate.
                </p>
              </div>

              {/* Room Selector */}
              <select
                value={selectedRoomId}
                onChange={(e) => setSelectedRoomId(e.target.value)}
                className="bg-[#161616] border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF7A00]"
              >
                {roomList.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title} ({r.categorySlug})
                  </option>
                ))}
              </select>
            </div>

            {/* Click-to-place Hotspot Area */}
            <div className="space-y-2">
              <div
                onClick={handleImageClickToPlaceHotspot}
                className="relative rounded-2xl overflow-hidden border-2 border-white/20 cursor-crosshair group shadow-2xl"
              >
                <img
                  src={activeRoom.fullRoomImage}
                  alt={activeRoom.title}
                  className="w-full aspect-[16/10] object-cover"
                />

                {/* Placed Hotspots */}
                {activeRoom.hotspots.map((hs) => (
                  <div
                    key={hs.id}
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/90 border border-[#FF7A00] text-[10px] text-white shadow-xl pointer-events-none"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#FF7A00]" />
                    <span className="font-semibold">{hs.label} ({hs.x}%, {hs.y}%)</span>
                  </div>
                ))}

                <div className="absolute top-4 left-4 p-2 rounded-lg bg-black/80 backdrop-blur-md text-[11px] text-[#FFD3A1] border border-white/10">
                  Click on any piece in this room photo to place a new hotspot
                </div>
              </div>
            </div>

            {/* Add New Room Style Photo Form */}
            <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-4 hard-shadow">
              <h3 className="font-serif text-xl text-white">Add New Style Photo to Gallery</h3>
              <form onSubmit={handleAddNewRoomStyle} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Arrangement Title (e.g. Mayfair Salon)"
                  value={newStyleTitle}
                  onChange={(e) => setNewStyleTitle(e.target.value)}
                  className="bg-[#181818] border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />

                <input
                  type="url"
                  required
                  placeholder="Unsplash Image URL (photo-XXXXX...)"
                  value={newStyleImage}
                  onChange={(e) => setNewStyleImage(e.target.value)}
                  className="bg-[#181818] border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />

                <div className="flex gap-2">
                  <select
                    value={newStyleCategory}
                    onChange={(e) => setNewStyleCategory(e.target.value as any)}
                    className="bg-[#181818] border border-white/20 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none flex-1"
                  >
                    <option value="living-room">Living Room</option>
                    <option value="dining-room">Dining Room</option>
                    <option value="bedroom">Bedroom</option>
                  </select>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-wider hard-shadow shrink-0"
                  >
                    Add Room
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
