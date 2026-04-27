"use client";

import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { useCartStore } from "@/app/store/cartStore";
import { Pagination } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";

export default function StoreFrontPage() {
  const router = useRouter();
  const { increment, decrement } = useCartStore();
  const { setUser } = useUserStore();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setUser({
      id: "69da68b479caa5163b2370b9",
      firstName: "Monojit",
      lastName: "Saha",
      email: "monojeetsaha1993@gmail.com",
      address: {
        line1: "30/22/C/1 S.N.Govt. Colony Morepukur Rishra",
        line2: "",
        city: "Rishra",
        postalCode: 712250,
        state: "West Bengal",
        country: "IN",
      },
      stripeCustomerId: "cus_U6dRj9Fgl2f51r",
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/product/list?page=${page}&limit=${limit}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const data = await response.json();
        setProducts(data.data.products);
        setTotal(data.data.total);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchData();
  }, [page, limit]);

  const handleCheckClick = (id: number) => {
    router.push(`/ecom/product/${id}`);
  };

  const handlePlusClick = (product: any) => {
    increment({
      ...product,
      count: 0,
    });
  };

  const handleMinusClick = (id: number) => {
    decrement(id);
  };

  const productCards = products.map((product: any) => (
    <ProductCard
      key={product.id}
      productName={product.name}
      productDescription={product.description}
      onCheckClick={() => handleCheckClick(product.id)}
      onPlusClick={() => handlePlusClick(product)}
      onMinusClick={() => handleMinusClick(product.id)}
    />
  ));

  return (
    <Fragment>
      <div className="flex flex-wrap gap-6">{productCards}</div>

      <div className="flex justify-center mt-6">
        <Pagination
          simple
          current={page}
          pageSize={limit}
          total={total}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>
    </Fragment>
  );
}
