import { useState } from 'react';
import axios from 'axios';
import IngredientService from '../services/CategoryService';

const modelIngredient = {
  name: '',
  price: 0,
  purchase_price: 0,
  measure: 'kg',
  portions: 0,
  type: 'ingredient',
  edited: false,
};

const useIngredientStore = () => {
  const [ingredients, setIngredients] = useState([]);

  const fetch = async () => {
    if (!activeCategory) return [];
    const result = await axios.get('/api/ingredient/' + activeCategory);
    setIngredients(
      result.data.map((item) => {
        return {
          ...item,
          type: 'ingredient',
          created: true,
        };
      })
    );
  };

  const getByCategory = async (id) => {
    if (!id) return [];
    const result = await axios.get('/api/ingredient/' + id);
    setIngredients(
      result.data.map((item) => {
        return {
          ...item,
          type: 'ingredient',
          created: true,
        };
      })
    );
  };

  const addIngredient = async (data) => {
    const response = await axios.post('/api/ingredient', data);
    if (response.status !== 200) {
      console.error(response.error);
      return;
    }

    const result = response.data;
    const exists = ingredients.find((i) => i.name === result.name);
    if (!exists) {
      const ingredient = { ...result };
      ingredient.created = true;
      setIngredients([...ingredients, ingredient]);
    }
  };

  const updateIngredient = async ({ id, data }) => {
    const response = await axios.patch(`/api/ingredient/${id}`, data);
    if (response.status !== 200) {
      console.error(response.error);
      return;
    }
  };

  const deleteIngredient = async ({ id }) => {
    await axios.delete(`/api/ingredient/${id}`);
  };

  return {
    ingredients,
    fetch,
    getByCategory,
    addIngredient,
    updateIngredient,
    deleteIngredient,
  };
};

export default useIngredientStore;