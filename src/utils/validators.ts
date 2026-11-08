export interface ValidationErrors {
  name?: string;
  description?: string;
  price?: string;
}

export function validateMenuItem(input: {
  name: string;
  description: string;
  price: string;
}): { isValid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  if (!input.name.trim()) {
    errors.name = 'Name is required.';
  } else if (input.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!input.description.trim()) {
    errors.description = 'Description is required.';
  }

  const priceNum = Number(input.price);
  if (!input.price.trim()) {
    errors.price = 'Price is required.';
  } else if (Number.isNaN(priceNum)) {
    errors.price = 'Price must be a number.';
  } else if (priceNum <= 0) {
    errors.price = 'Price must be greater than 0.';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}