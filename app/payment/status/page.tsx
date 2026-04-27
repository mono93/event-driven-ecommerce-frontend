"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Result, Spin } from "antd";
import { useUserStore } from "@/app/store/userStore";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<"success" | "error">("success");
  const [loading, setLoading] = useState(false);

  const { setUser } = useUserStore();

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
    const sessionId = searchParams.get("session_id");
    const statusParam = searchParams.get("status");

    if (!sessionId) {
      router.replace("/ecom");
      return;
    }

    if (statusParam === "cancel") {
      setStatus("error");
      handlePaymentFailure(sessionId);
    }
  }, [searchParams, router]);

  const handlePaymentFailure = async (sessionId: string) => {
    try {
      setLoading(true);

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
        }),
      });
    } catch (error) {
      console.error("Failed to handle payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Result
      status={status}
      title={status === "success" ? "Purchase Successful" : "Purchase Failed"}
      extra={[
        <Button type="primary" key="orders" onClick={() => router.push("/orders")}>
          Go to Orders
        </Button>,
      ]}
    />
  );
}
