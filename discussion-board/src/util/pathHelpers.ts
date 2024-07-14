export const paths = {
  homePath: () => `/`,
  topicPath: (topic: TopicSchema) => `/topics/${topic.id}/`,
  newPost: (topic: TopicSchema) => `/topics/${topic.id}/posts/new`,
  viewPost: (post: PostSchema) => `/topics/${post.topicId}/posts/${post.id}`,
  searchPath: (searchTerm: string) =>
    `/search?search=${encodeURIComponent(searchTerm)}`,
};
