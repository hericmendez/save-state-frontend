"use client";
import api from "@/lib/api";
import { create } from "zustand";
import toaster from "@/components/LayoutElements/Toaster";

interface Category {
  _id: string;
  name: string;
  count?: number;
}

interface CategoriesState {
  categories: Category[];

  // ações existentes
  fetchCategories: () => Promise<void>;
  setCategories: (cats: Category[]) => void;
  updateCategoryCount: (categoryId: string, delta: number) => void;

  // novas ações
  createCategory: (name: string) => Promise<void>;
  renameCategory: (categoryId: string, newName: string) => Promise<void>;
  deleteCategory: (categoryId: string) => Promise<void>;
  clearCategory: (categoryId: string) => Promise<void>;
}

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  categories: [],

  setCategories: (cats) => set({ categories: cats }),

  fetchCategories: async () => {
    try {
      const res = await api.get("/categories");
      const data = res?.data || [];
      set({ categories: data });
    } catch (err) {
      console.error("Erro ao buscar categorias", err);
    }
  },

  updateCategoryCount: (categoryId, delta) => {
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat._id === categoryId
          ? { ...cat, count: (cat.count || 0) + delta }
          : cat
      ),
    }));
  },

  /** 🔹 Criar nova categoria */
  createCategory: async (name) => {
    try {
      await api.post("/categories", { name });
      toaster("success", `Categoria "${name}" criada com sucesso.`);
      await get().fetchCategories();
    } catch (err: any) {
      console.error("Erro ao criar categoria:", err);
      toaster("error", err?.response?.data?.message || "Erro ao criar categoria.");
    } finally {
      get().fetchCategories()
    }
  },

  /** 🔹 Renomear categoria existente */
  renameCategory: async (categoryId, newName) => {
    try {
      await api.put(`/categories/${categoryId}`, { name: newName });
      toaster("success", `Categoria renomeada para "${newName}".`);
  
    } catch (err: any) {
      console.error("Erro ao renomear categoria:", err);
      toaster("error", err?.response?.data?.message || "Erro ao renomear categoria.");
    } finally {
get().fetchCategories()    }
  },

  /** 🔹 Excluir categoria */
  deleteCategory: async (categoryId) => {
    try {
      await api.delete(`/categories/${categoryId}`);
      toaster("success", "Categoria excluída com sucesso.");
      
    } catch (err: any) {
      console.error("Erro ao excluir categoria:", err);
      toaster("error", err?.response?.data?.message || "Erro ao excluir categoria.");
    } finally {
      get().fetchCategories()
    }
  },

  /** 🔹 Limpar categoria (“Sem categoria” ou qualquer uma) */
  clearCategory: async (categoryId) => {
    try {
      await api.delete(`/categories/${categoryId}/clear`);
      toaster("success", "Categoria limpa com sucesso.");

    } catch (err: any) {
      console.error("Erro ao limpar categoria:", err);
      toaster("error", err?.response?.data?.message || "Erro ao limpar categoria.");
    } finally {
      get().fetchCategories()
    }
  },
}));
