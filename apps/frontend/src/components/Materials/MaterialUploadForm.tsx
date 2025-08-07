'use client';

import { useState } from 'react';
import { Material, MaterialType } from '@/types/material';
import { v4 as uuidv4 } from 'uuid';

const tipos: MaterialType[] = ['pdf', 'video', 'link'];

export default function MaterialUploadForm() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'pdf' as MaterialType,
    url: '',
    module: '',
    theme: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMaterial: Material = {
      ...form,
      id: uuidv4(),
    };
    setMaterials([...materials, newMaterial]);
    setForm({
      title: '',
      description: '',
      type: 'pdf',
      url: '',
      module: '',
      theme: '',
    });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold">Adicionar Material</h2>

        <input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Descrição"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select name="type" value={form.type} onChange={handleChange} className="p-2 border rounded">
          {tipos.map((t) => (
            <option key={t} value={t}>
              {t.toUpperCase()}
            </option>
          ))}
        </select>

        <input
          name="url"
          placeholder="URL ou caminho do arquivo"
          value={form.url}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="module"
          placeholder="Módulo (ex: Matemática)"
          value={form.module}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="theme"
          placeholder="Tema (ex: Álgebra)"
          value={form.theme}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Enviar
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Materiais Enviados</h3>
        {materials.map((mat) => (
          <div key={mat.id} className="p-4 border rounded bg-gray-50">
            <p className="font-bold">{mat.title}</p>
            <p className="text-sm text-gray-600">{mat.description}</p>
            <p className="text-sm">
              <strong>Tipo:</strong> {mat.type.toUpperCase()} | <strong>Módulo:</strong> {mat.module} |{' '}
              <strong>Tema:</strong> {mat.theme}
            </p>
            <a href={mat.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              Acessar
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
