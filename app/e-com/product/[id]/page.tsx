import { Button } from 'antd';
import { DeleteOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';

export default function ProductPage() {
  return (
    <div className="flex gap-4 border border-gray-300 p-4 rounded-lg">
      <div className="w-[450px] h-[550px] bg-gray-100 flex-shrink-0 flex items-center justify-center">
        <Image
          draggable={false}
          alt="example"
          src="/images/product_sample_icon_picture.png"
          width={300}
          height={300}
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div>
          <div className="text-lg font-semibold">Product Name</div>

          <div className="text-sm text-gray-600 mt-1">Product Description</div>

          <div className="text-base font-bold mt-2">Price</div>
        </div>

        <div className="flex flex-row gap-2">
          <Button type="primary" shape="round" icon={<PlusCircleOutlined />} size={'large'} />
          <Button type="primary" shape="round" icon={<MinusCircleOutlined />} size={'large'} />
          <Button type="primary" shape="round" icon={<DeleteOutlined />} size={'large'}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
