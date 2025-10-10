"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/api";

interface DeleteCategoryModalProps {
  open: boolean;
  onClose: () => void;
  category: { _id?: string; id?: string } | null;
  onDeleted: () => void | undefined;
}

export default function DeleteCategoryModal({ open, onClose, category, onDeleted }: DeleteCategoryModalProps) {


  const submit = async () => {
    try {
      if (category?.id) {
        await api.delete(`/categories/${category.id}`)
      }
      // aqui você pode disparar um evento / callback para atualizar lista, se precisar
    } catch (err) {
      console.error(err)
    } finally {
      onDeleted()
      onClose()
    }
  }
  return (
      <Dialog open={open} onClose={onClose} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-900/70" />

        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-lg bg-gray-800 p-6 text-left shadow-xl">
            <DialogTitle className="text-lg font-semibold text-white">
              {category?.id ? 'Editar categoria' : 'Adicionar nova lista de backlog'}
            </DialogTitle>

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={submit}
                className="rounded bg-green-500 px-3 py-2 text-sm font-semibold text-white hover:bg-green-400"
              >
               Excluir
              </button>
              <button
                onClick={onClose}
                className="rounded bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20"
              >
                Cancelar
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
  );
}
