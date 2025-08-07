import { Material } from '@/types/material';

export const mockMaterials: Material[] = [
  {
    id: '1',
    title: 'Introdução à Álgebra',
    description: 'PDF introdutório com teoria básica.',
    type: 'pdf',
    url: '/pdfs/algebra-intro.pdf',
    module: 'Matemática',
    theme: 'Álgebra',
  },
  {
    id: '2',
    title: 'Vídeo sobre Equações Lineares',
    description: 'Explicação em vídeo com exemplos.',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=abc123',
    module: 'Matemática',
    theme: 'Álgebra',
  },
];
