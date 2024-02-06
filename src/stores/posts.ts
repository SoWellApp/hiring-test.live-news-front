import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { pouchdb } from 'src/boot/pouchdb';
import { InfiniteScrollOptions, Post, PouchPost } from 'src/types';
import { ref } from 'vue';
import { useSyncState } from 'src/stores/sync';

export const usePostStore = defineStore('posts', () => {
  const isLoading = ref(true);
  const posts = ref<PouchPost[]>([]);
  const options = ref<InfiniteScrollOptions>({
    done: (data) => data.length < 10,
    offset: 0,
  });
  const { isOnline } = useSyncState();

  const storeToPouch = async (datas: Post[]) => {
    for (const doc of datas) {
      const data = {
        ...doc,
        _id: doc.id.toString(),
      };
      pouchdb
        .get(data._id)
        .then((existingDoc) => {
          return pouchdb.put({
            ...existingDoc,
            ...data,
          });
        })
        .catch((error) => {
          if (error.status === 404) {
            return pouchdb.put(data);
          } else {
            throw error;
          }
        })
        .then((response) => {
          console.log('create  and  update success ful', response);
        })
        .catch((error) => {
          console.error('error for the create and update', error);
        });
      await posts.value.push(data);
      isLoading.value = false;
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
      if (isOnline) {
        const response = await api.get<Post[]>(
          '/posts/find?limit=10&sort=updatedAt DESC'
        );
        storeToPouch(response.data);
      } else {
        getPosts();
      }
      done();
    }
  };

  const loadPosts = async () => {
    posts.value = [];
    try {
      const allDataInPouch = await pouchdb.allDocs({ include_docs: true });
      if (allDataInPouch.rows.length === 0 && isOnline) {
        const response = await api.get<Post[]>(
          '/posts/find?limit=10&sort=updatedAt DESC'
        );
        console.log('store');
        storeToPouch(response.data);
      } else {
        console.log('get');
        getPosts();
      }
    } catch (error) {
      console.error('🚀 ~ file: posts.ts:16 ~ loadPosts ~ error:', error);
      posts.value = [];
    } finally {
      // isLoading.value = false;
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
    await posts.value.push(...results.rows.map((row) => row.doc));
    isLoading.value = false;
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
