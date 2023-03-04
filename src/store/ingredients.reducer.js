import { useState } from 'react';
import axios from 'axios';
import IngredientService from '../services/IngredientService';

const modelIngredient = {
  name: '',
  price: 0,
  quantity: 0,
  measure: 'kg',
};

const useIngredientStore = () => {
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = async (id) => {
    if (!id) return [];
    const result = await IngredientService.get(id)
    setIngredients(result);
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
    const result = await IngredientService.save(data);
    if (result.error) return;

    const exists = ingredients.find((i) => i.name === result.name);
    if (!exists) {
      setIngredients([...ingredients, result]);
      return result;
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
    fetchIngredients,
    getByCategory,
    addIngredient,
    updateIngredient,
    deleteIngredient,
  };
};

export default useIngredientStore;