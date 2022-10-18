import React from "react";
import { Card } from "semantic-ui-react";

const PostItem = ({ post }) => {
  console.log("post", post);
  return (
    <Card.Group>
      <Card>
        <Card.Content>
          <Card.Header content={post.title} />
        </Card.Content>
        <Card.Content>
          <Card.Description>{post.description}</Card.Description>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default PostItem;
