'use client';

import { useRouter } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { useCartStore } from '@/app/store/cartStore';

export default function StoreFrontPage() {
  const router = useRouter();
  const { increment, decrement } = useCartStore();

  const handleCheckClick = (index: number) => {
    router.push(`/e-com/product/${index + 1}`);
  };

  const handlePlusClick = (index: number) => {
    const product = {
      id: index + 1,
      name: `Product Name ${index + 1}`,
      description: `Product Description ${index + 1}`,
      price: 99.99,
      count: 0,
    };
    increment(product);
  };

  const handleMinusClick = (index: number) => {
    decrement(index + 1);
  };

  const productCards = Array.from({ length: 6 }, (_, index) => (
    <ProductCard
      key={index}
      productName={`Product Name ${index + 1}`}
      productDescription={`Product Description ${index + 1}`}
      onCheckClick={() => handleCheckClick(index)}
      onPlusClick={() => handlePlusClick(index)}
      onMinusClick={() => handleMinusClick(index)}
    />
  ));

  return <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>{productCards}</div>;
}
