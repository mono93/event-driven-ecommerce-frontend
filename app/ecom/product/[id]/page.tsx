"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "antd";
import { DeleteOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useCartStore } from "@/app/store/cartStore";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id;

  const { products, increment, decrement, removeFromCart } = useCartStore();

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setProduct(data.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const cartItem = products.find((item: any) => item.id === product?.id);

  const count = cartItem?.count || 0;

  const handleIncrement = () => {
    if (!product) return;

    increment({
      ...product,
      count: 0,
    });
  };

  const handleDecrement = () => {
    if (!product) return;
    decrement(product.id);
  };

  const handleRemove = () => {
    if (!product) return;
    removeFromCart(product.id);
  };

  return (
    <div className="flex gap-4 border border-gray-300 p-4 rounded-lg">
      <div className="w-[450px] h-[550px] bg-gray-100 flex-shrink-0 flex items-center justify-center">
        <Image
          draggable={false}
          alt="example"
          src="/images/product_sample_icon_picture.png"
          width={300}
          height={300}
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div>
          <div className="text-lg font-semibold">{product?.name || "Loading..."}</div>

          <div className="text-sm text-gray-600 mt-1">{product?.description || ""}</div>

          <div className="text-base font-bold mt-2">₹ {product?.price || 0}</div>

          <div className="mt-2 text-sm text-gray-500">Qty in Cart: {count}</div>
        </div>

        <div className="flex flex-row gap-2">
          <Button
            type="primary"
            shape="round"
            icon={<PlusCircleOutlined />}
            size="large"
            onClick={handleIncrement}
          />

          <Button
            type="primary"
            shape="round"
            icon={<MinusCircleOutlined />}
            size="large"
            onClick={handleDecrement}
            disabled={count === 0}
          />

          <Button
            danger
            shape="round"
            icon={<DeleteOutlined />}
            size="large"
            onClick={handleRemove}
            disabled={count === 0}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
