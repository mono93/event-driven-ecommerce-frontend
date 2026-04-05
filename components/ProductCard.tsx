"use client";

import Image from "next/image";
import { Card } from "antd";
import { CheckCircleOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Meta } from "antd/es/list/Item";

interface ProductCardProps {
  productName: string;
  productDescription: string;
  onCheckClick: () => void;
  onPlusClick?: () => void;
  onMinusClick?: () => void;
}

export const ProductCard = ({
  productName,
  productDescription,
  onCheckClick,
  onPlusClick,
  onMinusClick,
}: ProductCardProps) => {
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <Image
          draggable={false}
          alt="example"
          src="/images/product_sample_icon_picture.png"
          width={300}
          height={300}
          style={{ objectFit: "cover" }}
        />
      }
      actions={[
        <div key="part1" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <CheckCircleOutlined onClick={onCheckClick} style={{ cursor: "pointer" }} />
        </div>,
        <div
          key="part2"
          style={{ display: "flex", justifyContent: "center", gap: "16px", width: "100%" }}
        >
          <PlusCircleOutlined onClick={onPlusClick} style={{ cursor: "pointer" }} />
          <MinusCircleOutlined onClick={onMinusClick} style={{ cursor: "pointer" }} />
        </div>,
      ]}
    >
      <Meta title={productName} description={productDescription} />
    </Card>
  );
};
