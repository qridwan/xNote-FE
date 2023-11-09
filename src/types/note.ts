export type noteType = {
  content: string;
  title: string;
  notebook_id?: number | null;
  user_id?: string;
  id?: string | number;
  category?: number | null;
  category_id?: number | null;
  create_time?: string | null;
  deleted_at?: string | null;
  color?: string;
  trash_id?: string | number | null;
};
