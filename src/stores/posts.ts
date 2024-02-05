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
    });
  };

  const loadMore = async (index: number, done: () => void) => {
    done();
    if (index > 1) {
      isLoading.value = true;
      const response = await api.get<Post[]>(
        '/posts/find?limit=10&sort=updatedAt DESC'
      );
      storeToPouch(response.data);
      isLoading.value = false;
      done();
    }
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
        console.log('store');
        storeToPouch(response.data);
        isLoading.value = false;
      } else {
        console.log('get');
        getPosts();
        isLoading.value = false;
      }
    } catch (error) {
      console.error('🚀 ~ file: posts.ts:16 ~ loadPosts ~ error:', error);
      posts.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const getPosts = async () => {
    const results = await pouchdb.allDocs({
      include_docs: true,
      attachments: true,
      limit: 10,
      descending: false,
      startkey: '_design/created_at',
      endkey: '_design/created_at\uffff',
    });
    posts.value = results.rows.map((row) => row.doc);
  };

  return {
    isLoading,
    posts,
    options,
    loadPosts,
    getPosts,
    loadMore,
  };
});
