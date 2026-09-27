import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({ baseURL: API_URL });

export async function fetchCategories() {
  const { data } = await api.get("/categories");
  return data.categories;
}

export async function fetchDesigns(params = {}) {
  const { data } = await api.get("/designs", { params });
  return data; // { designs, total, page, pageSize }
}

export async function fetchDesign(slug) {
  const { data } = await api.get(`/designs/${slug}`);
  return data; // { design, related }
}

export async function fetchCollections() {
  const { data } = await api.get("/collections");
  return data.collections;
}

export async function submitConsultation(payload) {
  const { data } = await api.post("/consultations", payload);
  return data;
}
