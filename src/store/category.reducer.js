import { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryService from '../services/CategoryService';

export default function useCategoryStore() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setCategories(categories);
  }, [categories]);

  async function fetchCategories() {
    const result = await CategoryService.fetch();
    setCategories(result);
  }

  async function addCategory(data) {
    const result = await CategoryService.save(data);
    if (result.error) return;
    const category = result;
    const exists = categories.find((i) => i.name === category.name);
    if (!exists) {
      setCategories([...categories, category]);
    }
  }

  async function updateCategory(id, data) {
    const result = await CategoryService.update(id, { name: data });
    const category = result;
    if (result.error) return;
    return setCategories(categories.map((i) => (i.id === id ? category : i)));
  }

  async function deleteCategory(id) {
    await axios.post(`/api/category/${id}`);
  }

  function handleSetSelectedCategory(category) {
    setSelectedCategory(category);
    // await fetchIngredients()
  }

  return {
    selectedCategory,
    categories,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    handleSetSelectedCategory,
  };
}