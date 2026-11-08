import { MenuItem, Course, COURSES } from '../models/MenuItem';

export interface MenuStats {
  totalItems: number;
  averagePrice: number;
  byCourse: Record<Course, number>;
}

export function calculateMenuStatistics(items: MenuItem[]): MenuStats {
  const totalItems = items.length;
  const averagePrice = totalItems === 0 ? 0 : items.reduce((sum, item) => sum + item.price, 0) / totalItems;
  
  const byCourse = COURSES.reduce((acc, course) => {
    acc[course] = items.filter((item) => item.course === course).length;
    return acc;
  }, {} as Record<Course, number>);

  return { totalItems, averagePrice, byCourse };
}

export const formatCurrency = (value: number): string => `R ${value.toFixed(2)}`;