export type MaterialType = 'pdf' | 'video' | 'link';

export interface Material {
  id: string;
  title: string;
  description: string;
  type: MaterialType;
  url: string;
  module: string;
  theme: string;
}
