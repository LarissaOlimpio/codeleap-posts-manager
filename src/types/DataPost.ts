export interface DataPost {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}
export interface PostListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: DataPost[];
}
