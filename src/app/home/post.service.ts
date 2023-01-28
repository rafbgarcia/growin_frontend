import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const routes = {
  posts: `https://growin-rafbgarcia.vercel.app/api/posts`,
  deletePost: (id: String) => `https://growin-rafbgarcia.vercel.app/api/posts/${id}`,
};

export type Post = {
  _id: String;
  title: String;
  content: String;
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.httpClient.get(routes.posts) as Observable<Post[]>;
  }

  createPost(data: Post): Observable<Post> {
    return this.httpClient.post(routes.posts, data) as Observable<Post>;
  }

  deletePost(post: Post) {
    return this.httpClient.delete(routes.deletePost(post._id));
  }
}
