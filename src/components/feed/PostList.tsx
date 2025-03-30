import React from 'react';
import Post from './Post';

interface PostType {
  id: number;
  title: string;
  content: string;
}

interface PostListProps {
  posts: PostType[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
