import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy } from '@shared';

import { Post, PostService } from './post.service';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  postForm!: FormGroup;
  loading = true;
  saving = false;

  constructor(private postService: PostService, private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
      this.loading = false;
    });
  }

  create() {
    this.postForm.disable();
    this.saving = true;
    this.postService.createPost(this.postForm.value).subscribe((post) => {
      this.saving = false;
      this.postForm.reset();
      this.postForm.enable();
      this.ngOnInit();
    });
  }

  deletePost(post: Post) {
    this.postService.deletePost(post).subscribe(() => {
      this.ngOnInit();
    });
  }
}
