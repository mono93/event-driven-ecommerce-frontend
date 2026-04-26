"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";
import { Badge, Layout, theme } from "antd";
import { ArrowLeftOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import { useCartStore } from "../store/cartStore";

const { Header, Content, Footer } = Layout;

export default function StoreLayout({ children }: Readonly<{ children: ReactNode }>) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();
  const pathname = usePathname();
  const { products } = useCartStore();

  const totalCount = useMemo(() => {
    return products.reduce((total, item) => total + item.count, 0);
  }, [products]);

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        {pathname !== "/ecom" && (
          <ArrowLeftOutlined
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => router.back()}
          />
        )}
        <div style={{ marginLeft: "auto" }}>
          <Badge count={totalCount} size="small" offset={[7, 1]}>
            <ShoppingCartOutlined
              style={{ color: "white", cursor: "pointer", fontSize: "20px" }}
              onClick={() => router.push(`/checkout`)}
            />
          </Badge>
        </div>
      </Header>
      <Content style={{ padding: 24 }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: "calc(100vh - 180px)",
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©{new Date().getFullYear()} Created by Monojit Saha
      </Footer>
    </Layout>
  );
}
