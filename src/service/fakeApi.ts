interface Comment {
  userId: string;
  text: string;
}

interface PostData {
  id: number;
  likes: string[];
  comments: Comment[];
}

const getDefaultPostData = (postId: number): PostData => ({
  id: postId,
  likes: [],
  comments: [],
});

const setPostData = (postData: PostData) => {
  localStorage.setItem(`post_${postData.id}`, JSON.stringify(postData));
};

const fakeApi = {
  getPostData: (postId: number): PostData => {
    const stored = localStorage.getItem(`post_${postId}`);
    if (!stored) return getDefaultPostData(postId);
    return JSON.parse(stored) as PostData;
  },

  likePost: (postId: number, username: string) => {
    const postData = fakeApi.getPostData(postId);

    if (!postData.likes.includes(username)) {
      const updatedData = {
        ...postData,
        likes: [...postData.likes, username],
      };
      setPostData(updatedData);
    }
  },

  unlikePost: (postId: number, username: string) => {
    const postData = fakeApi.getPostData(postId);
    const updatedData = {
      ...postData,
      likes: postData.likes.filter((name) => name !== username),
    };
    setPostData(updatedData);
  },

  toggleLike: (postId: number, username: string) => {
    const postData = fakeApi.getPostData(postId);
    if (postData.likes.includes(username)) {
      fakeApi.unlikePost(postId, username);
    } else {
      fakeApi.likePost(postId, username);
    }
  },

  commentOnPost: (postId: number, username: string, commentText: string) => {
    const postData = fakeApi.getPostData(postId);
    const updatedData = {
      ...postData,
      comments: [...postData.comments, { userId: username, text: commentText }],
    };
    setPostData(updatedData);
  },
};

export default fakeApi;
