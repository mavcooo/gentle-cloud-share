
export type FileItem = {
  id: string;
  name: string;
  type: 'folder' | 'image' | 'document' | 'pdf' | 'other';
  size?: number;
  modified?: string;
  path?: string;
  url?: string;
};
