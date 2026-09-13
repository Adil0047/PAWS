"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type OrderPreset = {
  academicLevel?: string;
  documentType?: string;
  pages?: number;
  deadline?: string;
  price?: number;
  preferredWriter?: string;
} | null;

type OrderContextValue = {
  isOpen: boolean;
  preset: OrderPreset;
  openOrder: (preset?: OrderPreset) => void;
  closeOrder: () => void;
};

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preset, setPreset] = useState<OrderPreset>(null);

  const openOrder = useCallback((p?: OrderPreset) => {
    setPreset(p ?? null);
    setIsOpen(true);
  }, []);

  const closeOrder = useCallback(() => setIsOpen(false), []);

  return (
    <OrderContext.Provider value={{ isOpen, preset, openOrder, closeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
}
