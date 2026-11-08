export type Course = 'Starter' | 'Main Course' | 'Dessert';
export const COURSES: Course[] = ['Starter', 'Main Course', 'Dessert'];

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
}

export const createId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;