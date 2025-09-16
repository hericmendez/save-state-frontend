"use client";

import React, { useEffect } from "react";

export interface ContextMenuItem {
  key?: string | number;
  label: string;
  onClick?: () => void;
  children?: ContextMenuItem[];
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

/**
 * ContextMenu simples: usa position: fixed para evitar clipping por overflow.
 * Fecha ao clicar fora (window click).
 */
const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, items, onClose }) => {
  useEffect(() => {
    const handleClickOutside = (ev: MouseEvent) => {
      // fechar sempre que clicar fora
      onClose();
    };

    window.addEventListener("click", handleClickOutside);
    window.addEventListener("contextmenu", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("contextmenu", handleClickOutside);
    };
  }, [onClose]);

  // limit basic positioning to viewport (prevenção simples de overflow)
  const clamp = (val: number, max: number) => Math.max(8, Math.min(val, max - 220));

  const viewportW = typeof window !== "undefined" ? window.innerWidth : 1200;
  const viewportH = typeof window !== "undefined" ? window.innerHeight : 800;

  const left = clamp(x, viewportW);
  const top = clamp(y, viewportH);

  return (
    <div
      className="fixed bg-slate-800 text-white rounded shadow-lg z-[9999] ring-1 ring-black/40"
      style={{ top, left, minWidth: 180 }}
      role="menu"
    >
      <ul className="divide-y divide-slate-700">
        {items.map((item, idx) => (
          <li key={item.key ?? `ctx-item-${idx}`} className="relative">
            <button
              className="block px-4 py-2 w-full text-left hover:bg-slate-700"
              onClick={(ev) => {
                ev.stopPropagation();
                item.onClick?.();
                onClose();
              }}
            >
              {item.label}
            </button>

            {/* submenu simples renderizado inline */}
            {item.children && item.children.length > 0 && (
              <ul className="pl-4 border-l border-slate-700 bg-slate-800">
                {item.children.map((child, cIdx) => (
                  <li key={child.key ?? `ctx-child-${idx}-${cIdx}`}>
                    <button
                      className="block px-4 py-2 w-full text-left hover:bg-slate-700"
                      onClick={(ev) => {
                        ev.stopPropagation();
                        child.onClick?.();
                        onClose();
                      }}
                    >
                      {child.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
