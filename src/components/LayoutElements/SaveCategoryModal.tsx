'use client'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import api from '@/lib/api'

type Category = { id?: string; name?: string } | null

type Props = {
  open?: boolean
  onClose?: () => void
  category?: Category
  // opcional: trigger custom (se quiser fornecer um botão externo)
  trigger?: React.ReactNode
  triggerClassName?: string
  triggerLabel?: string
  onUpdated:() => void
}

export default function SaveCategoryModal({
  open: controlledOpen,
  onClose,
  category = null,
  trigger,
  triggerClassName = '',
  triggerLabel = '+ Add nova lista...',
  onUpdated,
}: Props) {
  const isControlled = controlledOpen !== undefined
  const [open, setOpen] = useState<boolean>(!!controlledOpen)
  const [input, setInput] = useState('')

  // manter estado interno sincronizado quando controlado
  useEffect(() => {
    if (isControlled) setOpen(!!controlledOpen)
  }, [controlledOpen, isControlled])

  // preencher input quando category mudar (modo edição)
  useEffect(() => {
    setInput(category?.name ?? '')
  }, [category])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)

  const close = () => {
    if (isControlled) {
      onClose?.()
    } else {
      setOpen(false)
    }
  }

  const submit = async () => {
    try {
      if (category?.id) {
        await api.put(`/categories/${category.id}`, { name: input })
      } else {
        await api.post('/categories', { name: input })
      }
      // aqui você pode disparar um evento / callback para atualizar lista, se precisar
    } catch (err) {
      console.error(err)
    } finally {
      onUpdated()
      close()
    }
  }

  // render trigger:
  const renderTrigger = () => {
    // se o componente estiver sendo controlado, não renderiza o trigger automático.
    if (isControlled) {
      // se o pai passou um trigger, renderiza (pai deve controlar abrir)
      if (trigger) return <>{trigger}</>
      return null
    }

    // modo não-controlado: renderiza trigger (padrão ou custom)
    if (trigger) {
      if (React.isValidElement(trigger)) {
        return React.cloneElement(trigger as React.ReactElement, {
          onClick: () => setOpen(true),
        })
      }
      // trigger não-elemento — renderiza como botão
      return (
        <button onClick={() => setOpen(true)} className={triggerClassName}>
          {trigger}
        </button>
      )
    }

    return (
      <button onClick={() => setOpen(true)} className="">
        {triggerLabel}
      </button>
    )
  }

  return (
    <>
      {renderTrigger()}

      <Dialog open={open} onClose={close} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-900/70" />

        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-lg bg-gray-800 p-6 text-left shadow-xl">
            <DialogTitle className="text-lg font-semibold text-white">
              {category?.id ? 'Editar categoria' : 'Adicionar nova lista de backlog'}
            </DialogTitle>

            <div className="mt-4">
              <input
                value={input}
                onChange={handleInput}
                className="w-full rounded-md border p-2 bg-slate-900 text-slate-300"
                placeholder="Nome da lista"
              />
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={submit}
                className="rounded bg-green-500 px-3 py-2 text-sm font-semibold text-white hover:bg-green-400"
              >
                {category?.id ? 'Salvar' : 'Adicionar'}
              </button>
              <button
                onClick={close}
                className="rounded bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20"
              >
                Cancelar
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
