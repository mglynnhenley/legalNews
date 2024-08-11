import { List, Alert } from "@mui/material";
import Item from "./post";
import { IndividualPost, Posts } from "@/types";

const PostList: React.FC<{ postsToDisplay: Posts, searchText: string }> = ({ postsToDisplay, searchText }) => {
  const noPostsToDisplay = postsToDisplay.length === 0;

  return (
    <List sx={{ width: "70%", m: 2, paddingTop: 2 }}> 
        {postsToDisplay.map((individualPostProp: IndividualPost) => (
          <Item key={individualPostProp.id} {...individualPostProp} searchText={searchText} />
        ))}
      {noPostsToDisplay && (
       <Alert severity="info" >Keine passenden Beiträge!</Alert>
      )}
    </List>
  );
};

export default PostList;
