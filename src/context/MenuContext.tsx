import React, { createContext, useContext, useMemo, useState } from 'react';
import { MenuItem, createId } from '../models/MenuItem';

interface MenuContextValue {
  items: MenuItem[];
  addItem: (item: Omit<MenuItem, 'id'>) => void;
  updateItem: (id: string, item: Omit<MenuItem, 'id'>) => void;
  deleteItem: (id: string) => void;
  getItemById: (id: string) => MenuItem | undefined;
}

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<MenuItem[]>([]); // Starts empty

  const addItem = (item: Omit<MenuItem, 'id'>) => setItems((prev) => [{ ...item, id: createId() }, ...prev]);
  const updateItem = (id: string, updated: Omit<MenuItem, 'id'>) => setItems((prev) => prev.map((existing) => existing.id === id ? { ...updated, id } : existing));
  const deleteItem = (id: string) => setItems((prev) => prev.filter((item) => item.id !== id));
  const getItemById = (id: string) => items.find((item) => item.id === id);

  const value = useMemo(() => ({ items, addItem, updateItem, deleteItem, getItemById }), [items]);

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export const useMenu = (): MenuContextValue => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used inside MenuProvider');
  return ctx;
};