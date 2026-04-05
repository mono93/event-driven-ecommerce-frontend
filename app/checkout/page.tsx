import { Card, Space, Button } from "antd";

export default function CheckoutPage() {
  return (
    <div className="flex gap-6 w-full">
      {/* LEFT: Product Info */}
      <div className="flex-1">
        <Space orientation="vertical" size="middle" className="flex w-full">
          <Card title="Product 1" size="small">
            <p>Basic T-shirt</p>
            <p>₹499</p>
          </Card>

          <Card title="Product 2" size="small">
            <p>Jeans</p>
            <p>₹1299</p>
          </Card>

          <Card title="Product 3" size="small">
            <p>Sneakers</p>
            <p>₹2499</p>
          </Card>
        </Space>
      </div>

      {/* Divider replacement */}
      <div className="w-px bg-gray-300" />

      {/* RIGHT: Total Price / Checkout */}
      <div className="flex-1 max-w-md">
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹4297</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹100</span>
            </div>

            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-green-600">-₹300</span>
            </div>
          </div>

          <div className="border-t my-4" />

          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>₹4097</span>
          </div>

          <Button type="primary" block className="mt-4">
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
