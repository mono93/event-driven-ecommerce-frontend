"use client";

import { Card, Button, message } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useCartStore } from "../store/cartStore";
import { useUserStore } from "../store/userStore";
import { useState } from "react";

export default function CheckoutPage() {
  const { products, increment, decrement, clearCart } = useCartStore();
  const { user } = useUserStore();

  const [loading, setLoading] = useState(false);

  const subtotal = products.reduce((sum: number, item: any) => sum + item.price * item.count, 0);

  const total = subtotal;

  const handleIncrement = (item: any) => {
    increment(item);
  };

  const handleDecrement = (id: number) => {
    decrement(id);
  };

  const proceedToOrder = async () => {
    if (!user) {
      message.error("User not found");
      return;
    }

    if (products.length === 0) {
      message.error("Cart is empty");
      return;
    }

    try {
      setLoading(true);

      const orderId = await createOrder();

      if (!orderId) {
        message.error("Failed to create order");
        return;
      }

      const checkoutUrl = await createCheckoutSession(orderId);

      if (checkoutUrl) {
        globalThis.location.href = checkoutUrl;
      } else {
        message.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error(error);
      message.error("Something went wrong");
    } finally {
      setLoading(false);
      clearCart();
    }
  };

  const createOrder = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          items: products.map((p: any) => ({
            priceId: p.stripePriceId,
            quantity: p.count,
          })),
        }),
      });

      const result = await response.json();

      console.log("Order Response:", result);

      return result?.data?.orderId;
    } catch (error) {
      console.error("Create Order Error:", error);
      return null;
    }
  };

  const createCheckoutSession = async (orderId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.id,
            orderId,
            items: products.map((p: any) => ({
              priceId: p.stripePriceId,
              quantity: p.count,
            })),
            successUrl: `${globalThis.location.origin}/payment/status?status=success`,
            cancelUrl: `${globalThis.location.origin}/payment/status?status=cancel`,
          }),
        },
      );

      const result = await response.json();

      console.log("Checkout Response:", result);

      return result?.data?.url;
    } catch (error) {
      console.error("Checkout Error:", error);
      return null;
    }
  };

  return (
    <div className="flex gap-6 w-full">
      {/* LEFT SIDE */}
      <div className="flex-1">
        <div className="flex flex-col gap-4">
          {products.map((item: any) => (
            <Card key={item.id} title={item.name} size="small">
              <p>{item.description}</p>
              <p>₹{item.price}</p>

              <div className="flex items-center gap-3 mt-3">
                <Button
                  shape="circle"
                  icon={<MinusCircleOutlined />}
                  onClick={() => handleDecrement(item.id)}
                />

                <span className="font-semibold">{item.count}</span>

                <Button
                  shape="circle"
                  icon={<PlusCircleOutlined />}
                  onClick={() => handleIncrement(item)}
                />
              </div>

              <p className="mt-3 font-medium">Total: ₹{item.price * item.count}</p>
            </Card>
          ))}

          {products.length === 0 && (
            <Card>
              <p>Cart is empty</p>
            </Card>
          )}
        </div>
      </div>

      {/* DIVIDER */}
      <div className="w-px bg-gray-300" />

      {/* RIGHT SIDE */}
      <div className="flex-1 max-w-md">
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="border-t my-4" />

          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <Button
            type="primary"
            block
            className="mt-4"
            loading={loading}
            disabled={products.length === 0}
            onClick={proceedToOrder}
          >
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
