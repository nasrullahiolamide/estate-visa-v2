import { FlowContentHorizontal } from "@/components/layout";
import { ProductCard } from "../card";

export function TotalListings() {
  return (
    <FlowContentHorizontal
      mah={{
        base: "auto",
        lg: 610,
      }}
      breakpoint='320'
      gap={20}
      className='p-3 lg:px-0'
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductCard key={index} />
      ))}
    </FlowContentHorizontal>
  );
}
