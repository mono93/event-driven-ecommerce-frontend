"use client";

import type { ReactNode } from "react";
import { Layout, theme } from "antd";

const { Header, Content, Footer } = Layout;

export default function CheckoutLayout({ children }: Readonly<{ children: ReactNode }>) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>Header</Header>

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
