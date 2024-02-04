import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { pouchdb } from 'src/boot/pouchdb';
import { InfiniteScrollOptions, Post, PouchPost } from 'src/types';
import { ref } from 'vue';

export const usePostStore = defineStore('posts', () => {
  const isLoading = ref(false);
  const posts = ref<PouchPost[]>([]);
  const options = ref<InfiniteScrollOptions>({
    done: (data) => data.length < 10,
    offset: 0,
  });

  const storeToPouch = async (datas: Post[]) => {
    for (const doc of datas) {
      const data = {
        ...doc,
        _id: doc.id.toString(),
      };
      await pouchdb.put(data);
      posts.value.push(data);
    }
  };

  const refreshLocalyDb = () => {
    pouchdb.allDocs({ include_docs: true }).then(async (result) => {
      const docsToDelete = result.rows.map((row) => row.doc);
      await pouchdb.bulkDocs(
        docsToDelete.map((doc) => ({ ...doc, _deleted: true }))
      );
      console.log('Toutes les données ont été supprimées !');
    });
  };

  const loadPosts = async () => {
    isLoading.value = true;
    posts.value = [];
    try {
      const allDataInPouch = await pouchdb.allDocs({ include_docs: true });
      if (allDataInPouch.rows.length === 0) {
        const response = await api.get<Post[]>(
          '/posts/find?limit=10&sort=updatedAt DESC'
        );
        storeToPouch(response.data);
      } else {
        getPosts();
      }
    } catch (error) {
      console.error('🚀 ~ file: posts.ts:16 ~ loadPosts ~ error:', error);
      posts.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const getPosts = () => {
    pouchdb
      .allDocs({
        include_docs: true,
        attachments: true,
      })
      .then(async (result) => {
        posts.value = result.rows.map((row) => row.doc);
        console.log('here', posts.value.length);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    isLoading,
    posts,
    options,
    loadPosts,
    getPosts,
  };
});
