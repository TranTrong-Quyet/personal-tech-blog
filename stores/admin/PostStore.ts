import { defineStore } from "pinia";

export interface Post {
  title: string;
  content: string;
}

interface PostState {
  post: Post;
  message: string;
  isLoading: boolean;
}
const usePostStore = defineStore("post", () => {
  const state: Ref<PostState> = ref({
    post: {
      title: "",
      content: "",
    },
    message: "",
    isLoading: false,
  });

  const addPost = async (values: Post) => {
    try {
      const { data, status } = await $fetch("/api/post/create", {
        method: "POST",
        body: values,
      });

      //   if (status..value) {
      //       throw new Error(error.value.message);
      //     }

      return data;
    } catch (error) {
      console.error("Error adding post:", (error as Error).message);
      return null;
    }
  };

  return { state, addPost };
});

export { usePostStore };