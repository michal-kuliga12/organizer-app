export interface ITodo {
  id?: number;
  name: string | null;
  status: string | null;
  created: Date;
  deadline: Date;
}
