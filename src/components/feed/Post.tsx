// filepath: /instagram-clone/instagram-clone/src/components/feed/Post.tsx

import React from 'react';

interface PostProps {
    id: string;
    username: string;
    content: string;
    timestamp: string;
}

const Post: React.FC<PostProps> = ({ id, username, content, timestamp }) => {
    return (
        <div className="post" key={id}>
            <h3>{username}</h3>
            <p>{content}</p>
            <small>{new Date(timestamp).toLocaleString()}</small>
        </div>
    );
};

export default Post;