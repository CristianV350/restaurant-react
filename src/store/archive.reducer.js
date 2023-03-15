import { useState, useEffect } from 'react';
import axios from 'axios';
import ArchiveService from '../services/ArchiveService';

export default function useArchiveStore() {
  const [selectedArchive, setSelectedArchive] = useState(null);
  const [archives, setArchives] = useState([]);

  useEffect(() => {
    setArchives(archives);
  }, [archives]);

  async function fetchArchives(checkpoint_id) {
    const result = await ArchiveService.search({ checkpoint_id });
    setArchives(result);
  }

  async function addArchive(data) {
    const result = await ArchiveService.save(data);
    if (result.error) return;
    const archive = result;
    const exists = archives.find((i) => i.name === archive.name);
    if (!exists) {
      setArchives([...archives, archive]);
      return archive
    }
  }

  async function updateArchive(id, data) {
    const result = await ArchiveService.update(id, { name: data });
    const archive = result;
    if (result.error) return;
    return setArchives(archives.map((i) => (i.id === id ? archive : i)));
  }

  async function deleteArchive(id) {
    await axios.post(`/api/archive/${id}`);
  }

  function handleSetSelectedArchive(archive) {
    setSelectedArchive(archive);
    // await fetchIngredients()
  }

  return {
    selectedArchive,
    archives,
    fetchArchives,
    addArchive,
    updateArchive,
    deleteArchive,
    handleSetSelectedArchive,
  };
}