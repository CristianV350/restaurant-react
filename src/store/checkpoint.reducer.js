import { useReducer } from "react";
import axios from "axios";
import CheckpointService from "../services/CheckpointService";

const initialState = {
  activeCheckpoint: null,
  checkpoints: [],
};

function checkpointReducer(state, action) {
  switch (action.type) {
    case "SET_CHECKPOINTS":
      return { ...state, checkpoints: action.payload };
    case "ADD_CHECKPOINT":
      return { ...state, checkpoints: [...state.checkpoints, action.payload] };
    case "UPDATE_CHECKPOINT":
      return {
        ...state,
        checkpoints: state.checkpoints.map((c) =>
          c.id === action.payload.id ? { ...c, ...action.payload.data } : c
        ),
      };
    case "DELETE_CHECKPOINT":
      return {
        ...state,
        checkpoints: state.checkpoints.filter((c) => c.id !== action.payload),
      };
    case "SET_ACTIVE_CHECKPOINT":
      return { ...state, activeCheckpoint: action.payload };
    default:
      return state;
  }
}

export function useCheckpointStore() {
  const [state, dispatch] = useReducer(checkpointReducer, initialState);

  async function fetchCheckpoints() {
    let result = await CheckpointService.fetch();
    if (result.error) return;
    if (result.length && !state.activeCheckpoint)
      dispatch({ type: "SET_ACTIVE_CHECKPOINT", payload: result[0].id });
    dispatch({ type: "SET_CHECKPOINTS", payload: result });
  }

  async function addCheckpoint(checkpoint) {
    let exists = state.checkpoints.find((c) => c.name === checkpoint.name);
    if (!exists) {
      dispatch({ type: "ADD_CHECKPOINT", payload: { ...checkpoint } });
    }
  }

  async function updateCheckpoint(id, data) {
    await axios.patch(`/api/checkpoint/${id}`, data);
    dispatch({ type: "UPDATE_CHECKPOINT", payload: { id, data } });
  }

  async function deleteCheckpoint(id) {
    await axios.post(`/api/checkpoint/${id}`);
    dispatch({ type: "DELETE_CHECKPOINT", payload: id });
  }

  function handleSetSelectedCheckpoint(id) {
    if (id === state.activeCheckpoint) return;
    dispatch({ type: "SET_ACTIVE_CHECKPOINT", payload: id });
  }

  return {
    activeCheckpoint: state.activeCheckpoint,
    checkpoints: state.checkpoints,
    fetchCheckpoints,
    addCheckpoint,
    updateCheckpoint,
    deleteCheckpoint,
    handleSetSelectedCheckpoint,
  };
}