/**
 * Product definitions for Space Magnum Equipments Pvt. Ltd.
 */

export type ProductId = 'stomat' | 'stolift' | 'storder' | 'compactors-racking'

export interface ProductSpec {
  label: string
  value: string
  unit?: string
  isConfirm?: boolean
}

export interface Product {
  id: ProductId
  name: string
  tagline: string
  description: string
  shortDesc: string
  primaryMetric: string
  secondaryMetric: string
  promise: string
  bestFor: string[]
  spaceSavingRange: { min: number; max: number; isConfirm: boolean }
  labourReductionRange: { min: number; max: number; isConfirm: boolean }
  specs: ProductSpec[]
  faqs: { question: string; answer: string }[]
  accentColor: string
  href: string
  /** Hero image path (relative to /public) */
  heroImage: string
  /** Gallery images (relative to /public) */
  galleryImages: string[]
}

export const PRODUCTS_MAP: Record<ProductId, Product> = {
  stomat: {
    id: 'stomat',
    name: 'STOMAT',
    tagline: 'High-Density Automated Vertical Carousel',
    description:
      'STOMAT is a high-density automated storage system that uses vertical carousel technology to bring stored items to the operator, eliminating aisle space and dramatically increasing storage density on the same floor footprint.',
    shortDesc: 'Automated Vertical Carousel System for rapid item-to-person retrieval.',
    primaryMetric: 'Height up to 12m',
    secondaryMetric: '500 kg / tray',
    promise: 'Store more in less floor — STOMAT brings every item to you.',
    bestFor: ['automotive', 'pharma', 'chemicals', 'manufacturing'],
    spaceSavingRange: { min: 40, max: 70, isConfirm: true },
    labourReductionRange: { min: 30, max: 60, isConfirm: true },
    specs: [
      { label: 'Storage Capacity', value: '[CONFIRM]', unit: 'kg per tray', isConfirm: true },
      { label: 'Number of Trays', value: '[CONFIRM]', isConfirm: true },
      { label: 'Height Range', value: '[CONFIRM]', unit: 'm', isConfirm: true },
      { label: 'Footprint', value: '[CONFIRM]', unit: 'm²', isConfirm: true },
      { label: 'Retrieval Time', value: '[CONFIRM]', unit: 'seconds', isConfirm: true },
      { label: 'Control System', value: 'PLC-based' },
      { label: 'Software Integration', value: 'WMS / ERP compatible' },
      { label: 'Power Supply', value: '[CONFIRM]', isConfirm: true },
    ],
    faqs: [
      {
        question: 'What types of items can STOMAT store?',
        answer:
          'STOMAT is suitable for a wide range of items including auto components, pharmaceutical products, tools, documents, and general industrial parts.',
      },
    ],
    accentColor: '#F97316',
    href: '/products/stomat',
    heroImage: '/images/products/asrs/asrs-1.jpg',
    galleryImages: [
      '/images/products/asrs/asrs-1.jpg',
      '/images/products/asrs/asrs-2.jpg',
      '/images/products/asrs/asrs-3.jpg',
      '/images/products/asrs/asrs-4.jpg',
      '/images/products/asrs/asrs-5.jpg',
    ],
  },
  stolift: {
    id: 'stolift',
    name: 'STOLIFT',
    tagline: 'Vertical Lift Module — Ceiling-Height Utilisation',
    description:
      'STOLIFT is a vertical lift module (VLM) that stores items in trays and retrieves them automatically at an ergonomic access opening. It maximises ceiling height utilisation.',
    shortDesc: 'Vertical Lift Module (VLM) utilizing ceiling heights up to 15m.',
    primaryMetric: 'Height up to 15m',
    secondaryMetric: '1000 kg / tray',
    promise: 'From floor to ceiling — every cubic metre put to work.',
    bestFor: ['automotive', 'pharma', 'chemicals', '3pl', 'manufacturing'],
    spaceSavingRange: { min: 60, max: 85, isConfirm: true },
    labourReductionRange: { min: 50, max: 75, isConfirm: true },
    specs: [
      { label: 'Max Height', value: '[CONFIRM]', unit: 'm', isConfirm: true },
      { label: 'Tray Dimensions', value: '[CONFIRM]', isConfirm: true },
      { label: 'Max Tray Load', value: '[CONFIRM]', unit: 'kg', isConfirm: true },
    ],
    faqs: [],
    accentColor: '#10B981',
    href: '/products/stolift',
    heroImage: '/images/products/carousel/carousel-1.jpg',
    galleryImages: [
      '/images/products/carousel/carousel-1.jpg',
      '/images/products/carousel/carousel-2.jpg',
      '/images/products/carousel/carousel-3.jpg',
      '/images/products/carousel/carousel-4.jpg',
      '/images/products/carousel/carousel-5.jpg',
    ],
  },
  storder: {
    id: 'storder',
    name: 'STORDER',
    tagline: 'Goods-to-Person Order Picking System',
    description:
      'STORDER is a goods-to-person order picking and retrieval system that eliminates operator travel time.',
    shortDesc: 'Goods-to-Person retrieval system maximizing picking throughput.',
    primaryMetric: '300+ picks/hr',
    secondaryMetric: '99.9% accuracy',
    promise: 'Zero travel time. Every item delivered — right, first time.',
    bestFor: ['automotive', 'pharma', '3pl', 'manufacturing'],
    spaceSavingRange: { min: 40, max: 65, isConfirm: true },
    labourReductionRange: { min: 40, max: 70, isConfirm: true },
    specs: [],
    faqs: [],
    accentColor: '#4F8EF7',
    href: '/products/storder',
    heroImage: '/images/products/asrs/asrs-3.jpg',
    galleryImages: [
      '/images/products/asrs/asrs-3.jpg',
      '/images/products/asrs/asrs-4.jpg',
      '/images/products/carousel/carousel-2.jpg',
    ],
  },
  'compactors-racking': {
    id: 'compactors-racking',
    name: 'Compactors & Racking',
    tagline: 'Mobile Compactor Systems & Heavy-Duty Racking',
    description:
      'Space Magnum mobile compactor systems eliminate fixed aisles, doubling usable storage density on the same floor area. Includes mezzanine floors, cantilever racks, slotted angle, heavy duty pallet racks, and drum storage systems.',
    shortDesc: 'Motorized mobile compactor storage eliminating aisle waste. Plus mezzanine floors, cantilever, pallet & slotted angle racks.',
    primaryMetric: '2x Density',
    secondaryMetric: 'Heavy payload',
    promise: 'One aisle. All your stock. Wherever you need it.',
    bestFor: ['automotive', '3pl', 'manufacturing', 'chemicals'],
    spaceSavingRange: { min: 30, max: 50, isConfirm: true },
    labourReductionRange: { min: 10, max: 30, isConfirm: true },
    specs: [],
    faqs: [],
    accentColor: '#B0BECE',
    href: '/products/compactors-racking',
    heroImage: '/images/products/compactor/compactor-1.jpg',
    galleryImages: [
      '/images/products/compactor/compactor-1.jpg',
      '/images/products/compactor/compactor-2.jpg',
      '/images/products/compactor/compactor-3.jpg',
      '/images/products/compactor/heavy-compactor.jpg',
      '/images/products/mezzanine/mezzanine-1.jpg',
      '/images/products/mezzanine/mezzanine-2.jpg',
      '/images/products/pallet/pallet-1.jpg',
      '/images/products/cantilever/cantilever-1.jpg',
      '/images/products/cantilever/cantilever-3.jpg',
      '/images/products/slotted-angle/slotted-1.jpg',
      '/images/products/slotted-angle/slotted-2.jpg',
      '/images/products/heavy-duty/heavy-duty-1.jpg',
    ],
  },
}

export const PRODUCTS: Product[] = Object.values(PRODUCTS_MAP)
export const PRODUCT_LIST = PRODUCTS
