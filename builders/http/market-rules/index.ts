import { api } from "@/builders/axios";
import { FilterParams } from "@/builders/types/filter-params";
import {
  MarketRulesList,
  UpdateMarketRulesData,
} from "@/builders/types/market-rules";

const get = function (params?: FilterParams & { estateId: string }) {
  return api
    .get<MarketRulesList>("/products/market-rules", { params })
    .then((data) => data.data);
};
const post = function (data: UpdateMarketRulesData) {
  return api.post("/products/market-rules", data);
};

const edit = function (variables: { id: string; data: UpdateMarketRulesData }) {
  const { id, data } = variables;
  return api.put(`/products/market-rules/${id}`, data);
};

const change_status = function ({
  id,
  status,
}: {
  id: string;
  status: "active" | "inactive";
}) {
  return api.put(`/products/market-rules/change-status/${id}`, { status });
};

const remove = function (id: string) {
  return api.delete(`/products/market-rules/${id}`);
};

export const market_rules = {
  get,
  post,
  change_status,
  remove,
};
