import { ProductData } from "@/builders/types/products";
import { ProductButtons } from "@/components/shared/market-place/product-buttons";
import { ProductDetail } from "@/components/shared/market-place/product-detail";

export function AdminProductDetail({ ...item }: ProductData) {
  return (
    <ProductDetail {...item}>
      <ProductButtons id={item.id} status={item.status} />
    </ProductDetail>
  );
}
