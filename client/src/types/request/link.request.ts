export interface LinkRequestCreate {
  link: string;
  linkName?: string;
}

export interface LinkRequestGet {
  limit?: number;
  page?: number;
}
