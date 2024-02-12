import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Post } from 'src/types';
import { ref, toRaw } from 'vue';

export const usePostStore = defineStore('posts', () => {
  const isPostLoading = ref(false);
  const posts = ref<Post[]>([]);
  const postsFromIndexDB = ref<Post[]>([]);

  // Load Post
  const loadPosts = async () => {
    isPostLoading.value = true;
    posts.value = [];
    try {
      const response = await api.get<Post[]>('/posts/find', {
        params: {
          sort: 'updatedAt DESC',
          limit: 10
        }
      });
      if (response.status === 200) {
        posts.value = response.data;
        const postsRaw = toRaw(posts.value);

        savePosts(postsRaw);

        isPostLoading.value = false;
      }

    } catch (error) {
      console.error('🚀 ~ file: posts.ts:16 ~ loadPosts ~ error:', error);
      posts.value = [];
      isPostLoading.value = false;
    }
  };

  // Save Post
  const savePosts = (dataArray: Post[]) => {
    const dbName = 'live_new_db';
    const storeName = 'post_store';
    const dbVersion = 1;

    const request = window.indexedDB.open(dbName, dbVersion);

    request.onerror = (event) => {
      console.error('Erreur lors de l\'ouverture de la base de données', (event.target as IDBRequest)?.error);

    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;

      if (!db.objectStoreNames.contains(storeName)) {
        const objectStore = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('id', 'id', { unique: false });
      }
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;

      const transaction = db.transaction(storeName, 'readwrite');
      const objectStore = transaction.objectStore(storeName);

      const addDataRecursive = (index: number) => {
        if (index >= dataArray.length) {
          console.log('Toutes les données ont été ajoutées à IndexedDB');
          transaction.oncomplete = () => {
            db.close();
          };
          return;
        }

        const data = dataArray[index];
        const addRequest = objectStore.add(data);

        addRequest.onsuccess = (event) => {
          console.log(`Donnée ${index + 1} ajoutée avec succès à IndexedDB`);
          addDataRecursive(index + 1);
        };

        addRequest.onerror = (event) => {
          console.error(`Erreur lors de l'ajout de la donnée ${index + 1} à IndexedDB`, (event.target as IDBRequest)?.error);
          addDataRecursive(index + 1);
        };
      };

      addDataRecursive(0);
    };

    request.onerror = (event) => {
      console.error('Erreur lors de l\'ouverture de la base de données', (event.target as IDBRequest)?.error);
    };

    request.onblocked = (event) => {
      console.log('L\'ouverture de la base de données est bloquée par une autre connexion ouverte');
    };
  };

  // Get Post from IndexDB
  const getPostsFromIndexedDB = async () => {

    postsFromIndexDB.value = [];
    isPostLoading.value = true;

    const dbName = 'live_new_db';
    const storeName = 'post_store';
    const dbVersion = 1;

    const request = window.indexedDB.open(dbName, dbVersion);

    request.onerror = (event: Event) => {
      console.error('Erreur lors de l\'ouverture de la base de données', (event.target as IDBRequest)?.error);
    };

    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;

      const transaction = db.transaction(storeName, 'readonly');
      const objectStore = transaction.objectStore(storeName);

      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = (event: Event) => {
        const dataArray = (event.target as IDBRequest).result;
        console.log('Données récupérées avec succès depuis IndexedDB', dataArray);
        postsFromIndexDB.value = dataArray;
        isPostLoading.value = false;
        db.close();
      };

      getAllRequest.onerror = (event: Event) => {
        console.error('Erreur lors de la récupération des données depuis IndexedDB', (event.target as IDBRequest)?.error);
      };
    };

    request.onerror = (event: Event) => {
      console.error('Erreur lors de l\'ouverture de la base de données', (event.target as IDBRequest)?.error);
    };

    request.onblocked = (event: Event) => {
      console.log('L\'ouverture de la base de données est bloquée par une autre connexion ouverte');
    };

  }

  return {
    isPostLoading,
    posts,
    postsFromIndexDB,
    loadPosts,
    getPostsFromIndexedDB
  };
});
