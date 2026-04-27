"use client";

import { useEffect, useState } from "react";
import { Card, Tag, Collapse, List, Pagination, Spin, Empty } from "antd";
import { useUserStore } from "../store/userStore";

const { Panel } = Collapse;

export default function OrderListPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const { user } = useUserStore();

  const userId = user?.id;
  console.log("Fetching orders for user ID:", user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/order/list?userId=${userId}&page=${page}&limit=${limit}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const result = await response.json();

        setOrders(result.data.orders || []);
        setTotal(result.data.total || 0);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page, limit]);

  const getStatusColor = (status: string) => {
    if (status === "success") return "green";
    if (status === "failed") return "red";
    return "default";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  if (!orders.length) {
    return <Empty description="No Orders Found" />;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">My Orders</h1>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <Card
            key={order.id}
            title={`Order #${order.id.slice(-6).toUpperCase()}`}
            extra={<Tag color={getStatusColor(order.status)}>{order.status}</Tag>}
          >
            <div className="flex justify-between mb-3 text-sm">
              <span>
                Date:{" "}
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>

              <span className="font-semibold">Total: ₹{order.totalOrderPrice}</span>
            </div>

            <Collapse ghost>
              <Panel header="View Items" key="1">
                <List
                  dataSource={order.items}
                  renderItem={(item: any) => (
                    <List.Item>
                      <div className="w-full flex justify-between">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">Qty: {item.count}</div>
                        </div>

                        <div className="font-medium">₹{item.subtotal}</div>
                      </div>
                    </List.Item>
                  )}
                />
              </Panel>
            </Collapse>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Pagination
          simple
          current={page}
          pageSize={limit}
          total={total}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
}
