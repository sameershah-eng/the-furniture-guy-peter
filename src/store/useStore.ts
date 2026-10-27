import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, products as initialProducts } from '../data/products';
import { brandConfig } from '../config/brand';

export interface CartItem {
  cartItemId: string;
  product: Product;
  size: string;
  finish: string;
  quantity: number;
  unitPrice: number;
}

export interface CustomerAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
}

export type OrderStatus = 'Confirmed' | 'Packed' | 'Dispatched' | 'Delivered';

export interface OrderTimelineEvent {
  status: OrderStatus;
  label: string;
  timestamp: string;
  description: string;
  done: boolean;
}

export interface Order {
  id: string;
  date: string;
  customer: CustomerAddress;
  items: CartItem[];
  subtotal: number;
  deliveryOption: 'london' | 'standard' | 'assembly' | 'pickup';
  deliveryCost: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: string;
  paymentRef: string;
  status: OrderStatus;
  timeline: OrderTimelineEvent[];
}

export interface Enquiry {
  id: string;
  date: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  message: string;
  productName?: string;
  productPrice?: number;
  status: 'New' | 'Contacted' | 'Resolved';
}

interface StoreState {
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  couponCode: string | null;
  discountAmount: number;
  deliveryOption: 'london' | 'standard' | 'assembly' | 'pickup';
  toggleCart: (open?: boolean) => void;
  addToCart: (product: Product, size?: string, finish?: string, quantity?: number, unitPrice?: number) => void;
  addMultipleToCart: (items: Array<{ product: Product; size?: string; finish?: string; quantity?: number; unitPrice?: number }>) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  setDeliveryOption: (option: 'london' | 'standard' | 'assembly' | 'pickup') => void;
  getCartSubtotal: () => number;
  getDeliveryCost: () => number;
  getCartTotal: () => number;

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Search Overlay
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  // Intro Loader
  hasSeenIntro: boolean;
  setHasSeenIntro: (seen: boolean) => void;

  // Orders
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'date' | 'timeline' | 'status'>) => string;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrder: (orderId: string) => Order | undefined;

  // Enquiries
  enquiries: Enquiry[];
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'date' | 'status'>) => string;
  updateEnquiryStatus: (id: string, status: 'New' | 'Contacted' | 'Resolved') => void;

  // Admin & Products Catalog overrides
  adminAuthenticated: boolean;
  adminLogin: (user: string, pass: string) => boolean;
  adminLogout: () => void;
  productOverrides: Record<string, { price: number; stock: number; sizes: string[] }>;
  updateProductPriceAndStock: (productId: string, price: number, stock: number) => void;
  getProductList: () => Product[];

  // Global Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
  clearToast: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart state
      cart: [],
      isCartOpen: false,
      couponCode: null,
      discountAmount: 0,
      deliveryOption: 'london',

      toggleCart: (open) =>
        set((state) => ({
          isCartOpen: typeof open === 'boolean' ? open : !state.isCartOpen,
        })),

      addToCart: (product, size, finish, quantity = 1, unitPrice) => {
        const chosenSize = size || product.sizes[0] || 'Standard';
        const chosenFinish = finish || product.finishes[0]?.name || 'Standard';
        const price = unitPrice !== undefined ? unitPrice : product.price;
        const cartItemId = `${product.id}-${chosenSize}-${chosenFinish}`;

        set((state) => {
          const existingIndex = state.cart.findIndex((item) => item.cartItemId === cartItemId);
          if (existingIndex > -1) {
            const updated = [...state.cart];
            updated[existingIndex].quantity += quantity;
            return { cart: updated, isCartOpen: true };
          } else {
            return {
              cart: [
                ...state.cart,
                {
                  cartItemId,
                  product,
                  size: chosenSize,
                  finish: chosenFinish,
                  quantity,
                  unitPrice: price,
                },
              ],
              isCartOpen: true,
            };
          }
        });

        get().showToast(`Added ${product.name} to your bag`);
      },

      addMultipleToCart: (items) => {
        set((state) => {
          const updated = [...state.cart];
          items.forEach(({ product, size, finish, quantity = 1, unitPrice }) => {
            const chosenSize = size || product.sizes[0] || 'Standard';
            const chosenFinish = finish || product.finishes[0]?.name || 'Standard';
            const price = unitPrice !== undefined ? unitPrice : product.price;
            const cartItemId = `${product.id}-${chosenSize}-${chosenFinish}`;

            const existingIndex = updated.findIndex((i) => i.cartItemId === cartItemId);
            if (existingIndex > -1) {
              updated[existingIndex].quantity += quantity;
            } else {
              updated.push({
                cartItemId,
                product,
                size: chosenSize,
                finish: chosenFinish,
                quantity,
                unitPrice: price,
              });
            }
          });
          return { cart: updated, isCartOpen: true };
        });

        get().showToast(`Added full room suite with 10% bundle discount!`);
      },

      updateQuantity: (cartItemId, delta) => {
        set((state) => {
          const updated = state.cart
            .map((item) => {
              if (item.cartItemId === cartItemId) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter(Boolean) as CartItem[];
          return { cart: updated };
        });
      },

      removeFromCart: (cartItemId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.cartItemId !== cartItemId),
        }));
      },

      clearCart: () => {
        set({ cart: [], couponCode: null, discountAmount: 0 });
      },

      applyCoupon: (rawCode: string) => {
        const code = rawCode.trim().toUpperCase();
        const subtotal = get().getCartSubtotal();

        if (code === brandConfig.coupons.WELCOME10.code) {
          const discount = Math.round(subtotal * 0.1);
          set({ couponCode: code, discountAmount: discount });
          return { success: true, message: '10% Welcome discount applied!' };
        }

        if (code === brandConfig.coupons.TFG50.code) {
          if (subtotal < 500) {
            return { success: false, message: 'TFG50 requires a minimum order of £500' };
          }
          set({ couponCode: code, discountAmount: 50 });
          return { success: true, message: '£50 discount applied!' };
        }

        return { success: false, message: 'Invalid promotional code' };
      },

      removeCoupon: () => {
        set({ couponCode: null, discountAmount: 0 });
      },

      setDeliveryOption: (option) => {
        set({ deliveryOption: option });
      },

      getCartSubtotal: () => {
        return get().cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
      },

      getDeliveryCost: () => {
        const { deliveryOption } = get();
        if (deliveryOption === 'pickup') return 0;
        if (deliveryOption === 'london') return brandConfig.delivery.londonDeliveryCost;
        if (deliveryOption === 'standard') return brandConfig.delivery.ukStandardDeliveryCost;
        if (deliveryOption === 'assembly') return brandConfig.delivery.whiteGloveAssemblyCost;
        return 0;
      },

      getCartTotal: () => {
        const subtotal = get().getCartSubtotal();
        const delivery = get().getDeliveryCost();
        const discount = get().discountAmount;
        return Math.max(0, subtotal + delivery - discount);
      },

      // Wishlist
      wishlistIds: ["prod-lr-1", "prod-dr-1"],
      toggleWishlist: (productId: string) => {
        set((state) => {
          const exists = state.wishlistIds.includes(productId);
          const next = exists
            ? state.wishlistIds.filter((id) => id !== productId)
            : [...state.wishlistIds, productId];
          return { wishlistIds: next };
        });
      },
      isInWishlist: (productId: string) => {
        return get().wishlistIds.includes(productId);
      },

      // Search
      isSearchOpen: false,
      setSearchOpen: (open) => set({ isSearchOpen: open }),

      // Intro Loader
      hasSeenIntro: false,
      setHasSeenIntro: (seen) => set({ hasSeenIntro: seen }),

      // Orders
      orders: [
        {
          id: "MO-2026-48213",
          date: "25 October 2026, 14:32",
          customer: {
            fullName: "Lady Victoria Spencer",
            email: "victoria.spencer@kensington.co.uk",
            phone: "+44 7700 900123",
            addressLine1: "42 Palace Gardens Terrace",
            addressLine2: "Apt 4B",
            city: "London",
            postcode: "W8 4RP",
          },
          items: [
            {
              cartItemId: "prod-lr-1-Medium 210cm-Burnt Orange Velvet",
              product: initialProducts[0],
              size: "Medium 210cm",
              finish: "Burnt Orange Velvet",
              quantity: 1,
              unitPrice: 1849,
            },
            {
              cartItemId: "prod-lr-3-120cm × 70cm Oval-Smoked English Oak",
              product: initialProducts[2],
              size: "120cm × 70cm Oval",
              finish: "Smoked English Oak",
              quantity: 1,
              unitPrice: 489,
            },
          ],
          subtotal: 2338,
          deliveryOption: "assembly",
          deliveryCost: 95,
          discount: 233,
          couponCode: "WELCOME10",
          total: 2200,
          paymentMethod: "Visa / Mastercard",
          paymentRef: "STRIPE_3DS_AUTH_98412",
          status: "Dispatched",
          timeline: [
            {
              status: "Confirmed",
              label: "Order Placed & Verified",
              timestamp: "25 Oct 2026, 14:32",
              description: "Payment captured via 3D Secure. Production order generated.",
              done: true,
            },
            {
              status: "Packed",
              label: "Bespoke Inspection & Blanket Packing",
              timestamp: "26 Oct 2026, 10:15",
              description: "Inspected at our London Atelier. Wrapped in protective moving blankets.",
              done: true,
            },
            {
              status: "Dispatched",
              label: "In Transit with White Glove Crew",
              timestamp: "27 Oct 2026, 08:30",
              description: "On specialized vehicle with driver Marcus & team. 2-hour delivery slot booked.",
              done: true,
            },
            {
              status: "Delivered",
              label: "Delivered & Assembled in Room",
              timestamp: "Estimated today by 16:00",
              description: "Room placement, leveling, and packaging recycling.",
              done: false,
            },
          ],
        },
      ],

      placeOrder: (orderData) => {
        const orderId = `MO-2026-${Math.floor(10000 + Math.random() * 90000)}`;
        const dateStr = new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

        const newOrder: Order = {
          ...orderData,
          id: orderId,
          date: dateStr,
          status: 'Confirmed',
          timeline: [
            {
              status: 'Confirmed',
              label: 'Order Placed & Payment Confirmed',
              timestamp: dateStr,
              description: 'Payment authorized. Order sent to Battersea showroom workshop.',
              done: true,
            },
            {
              status: 'Packed',
              label: 'Hand-Finished & Quilted Packaging',
              timestamp: 'Pending workshop prep (est. 24h)',
              description: 'Piece inspected, polished with natural oils, and blanket wrapped.',
              done: false,
            },
            {
              status: 'Dispatched',
              label: 'Dispatched with 2-Person Delivery Crew',
              timestamp: 'Pending transit',
              description: 'Assigned to our dedicated low-emission delivery van.',
              done: false,
            },
            {
              status: 'Delivered',
              label: 'Delivered & Assembled in Room',
              timestamp: 'Pending delivery appointment',
              description: 'White glove placement and removal of all protective packaging.',
              done: false,
            },
          ],
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
          cart: [],
          couponCode: null,
          discountAmount: 0,
        }));

        return orderId;
      },

      updateOrderStatus: (orderId, newStatus) => {
        const dateNow = new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        });

        const statusOrder: OrderStatus[] = ['Confirmed', 'Packed', 'Dispatched', 'Delivered'];
        const targetIndex = statusOrder.indexOf(newStatus);

        set((state) => {
          const updatedOrders = state.orders.map((ord) => {
            if (ord.id !== orderId) return ord;

            const updatedTimeline = ord.timeline.map((event) => {
              const eventIndex = statusOrder.indexOf(event.status);
              const isDone = eventIndex <= targetIndex;
              return {
                ...event,
                done: isDone,
                timestamp: isDone && !event.done ? `${dateNow}` : event.timestamp,
              };
            });

            return {
              ...ord,
              status: newStatus,
              timeline: updatedTimeline,
            };
          });

          return { orders: updatedOrders };
        });

        get().showToast(`Order ${orderId} updated to ${newStatus}. Customer notified via SMS & WhatsApp.`);
      },

      getOrder: (orderId) => {
        return get().orders.find((ord) => ord.id.toLowerCase() === orderId.toLowerCase());
      },

      // Enquiries
      enquiries: [
        {
          id: "ENQ-101",
          date: "26 October 2026",
          name: "Charles Montagu",
          phone: "+44 7911 123456",
          email: "charles.m@oxford.ac.uk",
          city: "Oxford",
          productName: "Calacatta Grand Marble Banquet",
          productPrice: 2499,
          message: "Could we commission this table with a 300cm length and custom ebonised oak pedestal fluting?",
          status: "New",
        },
        {
          id: "ENQ-102",
          date: "24 October 2026",
          name: "Arabella Crawford",
          phone: "+44 7700 900555",
          email: "arabella@crawfordinteriors.com",
          city: "London",
          productName: "Aurelia 3-Seater Velvet Sofa",
          productPrice: 1849,
          message: "Requesting fabric swatch sample memo for the Burnt Orange and Forest Emerald velvets for our Chelsea client project.",
          status: "Contacted",
        },
      ],

      addEnquiry: (data) => {
        const id = `ENQ-${Math.floor(100 + Math.random() * 900)}`;
        const dateStr = new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });

        const newEnquiry: Enquiry = {
          ...data,
          id,
          date: dateStr,
          status: 'New',
        };

        set((state) => ({
          enquiries: [newEnquiry, ...state.enquiries],
        }));

        return id;
      },

      updateEnquiryStatus: (id, status) => {
        set((state) => ({
          enquiries: state.enquiries.map((e) => (e.id === id ? { ...e, status } : e)),
        }));
      },

      // Admin Authentication
      adminAuthenticated: false,
      adminLogin: (user, pass) => {
        if (user === 'admin' && pass === 'admin123') {
          set({ adminAuthenticated: true });
          return true;
        }
        return false;
      },
      adminLogout: () => {
        set({ adminAuthenticated: false });
      },

      productOverrides: {},
      updateProductPriceAndStock: (productId, price, stock) => {
        set((state) => ({
          productOverrides: {
            ...state.productOverrides,
            [productId]: {
              price,
              stock,
              sizes: state.productOverrides[productId]?.sizes || [],
            },
          },
        }));
        get().showToast(`Product updated: Price £${price}, Stock ${stock}`);
      },

      getProductList: () => {
        const overrides = get().productOverrides;
        return initialProducts.map((p) => {
          if (overrides[p.id]) {
            return {
              ...p,
              price: overrides[p.id].price,
              stock: overrides[p.id].stock,
            };
          }
          return p;
        });
      },

      // Global Toast
      toastMessage: null,
      showToast: (msg) => {
        set({ toastMessage: msg });
        setTimeout(() => {
          set((state) => (state.toastMessage === msg ? { toastMessage: null } : {}));
        }, 3500);
      },
      clearToast: () => set({ toastMessage: null }),
    }),
    {
      name: 'the-furniture-guy-store-v2',
      partialize: (state) => ({
        cart: state.cart,
        couponCode: state.couponCode,
        discountAmount: state.discountAmount,
        deliveryOption: state.deliveryOption,
        wishlistIds: state.wishlistIds,
        hasSeenIntro: state.hasSeenIntro,
        orders: state.orders,
        enquiries: state.enquiries,
        productOverrides: state.productOverrides,
        adminAuthenticated: state.adminAuthenticated,
      }),
    }
  )
);
