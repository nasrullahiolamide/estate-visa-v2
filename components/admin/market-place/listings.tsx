import { ProductData } from "@/builders/types/products";
import { FlowContentHorizontal } from "@/components/layout";
import { ProductCard } from "@/components/shared/interface/cards/product";
import { MODALS } from "@/packages/libraries";
import { modals } from "@mantine/modals";
import { AdminProductDetail } from "./detail";

interface ListingsProps {
  data: ProductData[] | undefined;
  skeleton?: boolean;
}

const handleProductDetail = (item: ProductData) => {
  modals.open({
    modalId: MODALS.PRODUCT_DETAIL,
    children: <AdminProductDetail {...item} />,
    classNames: {
      body: "p-0",
      header: "right-8 top-6 absolute bg-transparent",
    },
  });
};

export function Listings({ data, skeleton }: ListingsProps) {
  return (
    <FlowContentHorizontal
      gap={24}
      breakpoint='250'
      className='p-3 bg-white h-full'
    >
      {data?.map((list) => (
        <ProductCard
          key={list.id}
          list={list}
          onClick={() => handleProductDetail(list)}
          skeleton={skeleton}
          viewId='admin'
        />
      ))}
    </FlowContentHorizontal>
  );
}
