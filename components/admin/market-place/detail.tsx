import { ProductData } from "@/builders/types/products";
import { configs } from "@/components/shared/interface/cards/product";
import { ProductDetail } from "@/components/shared/market-place/product-detail";

export function AdminProductDetail({ ...item }: ProductData) {
  return (
    <ProductDetail {...item}>{configs[item.status].buttons}</ProductDetail>
  );
}
