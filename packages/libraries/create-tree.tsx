import { TreeNodeData } from "@mantine/core";

function isObject(value: any): value is Record<string, any> {
  return typeof value === "object" && value !== null;
}

function isString(value: any): value is string {
  return typeof value === "string" || value instanceof String;
}

function stringify(value: unknown): string {
  return String(value)
    .split(/[_-\s]+/gi)
    .filter(Boolean)
    .join(" ");
}

type Primitive = Array<unknown> | string | number | boolean | null;
type Nest<T> = Record<PropertyKey, T>;
type Value = Primitive | Nest<Primitive | Nest<Primitive>>;

function createTreeFromString(value: string): TreeNodeData[] {
  return [
    {
      label: stringify(value),
      value: value,
    },
  ];
}

function createTreeFromObject(data: Record<string, any>): TreeNodeData[] {
  return Object.entries(data).map(([key, value]) => {
    const label = typeof value === "string" ? stringify(value) : stringify(key);

    if (Array.isArray(value)) {
      return {
        value: label,
        children: createTreeFromArray(value),
        label,
      };
    } else if (isObject(value)) {
      return {
        value: label,
        children: createTreeFromObject(value),
        label,
      };
    }
    return {
      value: stringify(value),
      label,
    };
  });
}

function createTreeFromArray(value: unknown[]): TreeNodeData[] {
  return value.map((item, idx) => {
    const label = stringify(item);
    const index = stringify(idx);

    if (Array.isArray(item)) {
      return {
        value: index,
        children: createTreeFromArray(item),
        label: index,
      };
    } else if (isObject(item)) {
      return {
        value: index,
        children: createTreeFromObject(item),
        label: index,
      };
    }
    return {
      value: label,
      label,
    };
  });
}

export function createTree(value: unknown): TreeNodeData[] {
  if (isString(value)) return createTreeFromString(value);
  else if (Array.isArray(value)) return createTreeFromArray(value);
  else if (isObject(value)) return createTreeFromObject(value);
  return [];
}
