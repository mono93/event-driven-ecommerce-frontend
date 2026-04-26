"use client";

import { Card, Button } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useCartStore } from "../store/cartStore";

export default function CheckoutPage() {
  const { products, increment, decrement } = useCartStore();

  const subtotal = products.reduce((sum: number, item: any) => sum + item.price * item.count, 0);

  const total = subtotal;

  const handleIncrement = (item: any) => {
    increment(item);
  };

  const handleDecrement = (id: number) => {
    decrement(id);
  };

  return (
    <div className="flex gap-6 w-full">
      {/* LEFT: Product List */}
      <div className="flex-1">
        <div className="w-full flex flex-col gap-4">
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
            <Card size="small">
              <p>Cart is empty</p>
            </Card>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-gray-300" />

      {/* RIGHT: Summary */}
      <div className="flex-1 max-w-md">
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
          </div>

          <div className="border-t my-4" />

          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <Button type="primary" block className="mt-4" disabled={products.length === 0}>
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
