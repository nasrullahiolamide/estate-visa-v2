import { ScrollAreaAutosize, Tree } from "@mantine/core";

import { createTree } from "../libraries/create-tree";
import { Leaf } from "./leaf";

interface BranchProps {
  data: unknown;
}

export function Branch({ data }: BranchProps) {
  return (
    <Tree
      levelOffset={20}
      data={createTree(data)}
      renderNode={(payload) => <Leaf {...payload} />}
    />
  );
}
