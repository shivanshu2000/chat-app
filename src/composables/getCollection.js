import { ref, watchEffect } from 'vue';
import { firestore } from '../firebase/config';

const getCollection = (collection) => {
  const error = ref(null);

  const documents = ref(null);

  const collectionRef = firestore
    .collection(collection)
    .orderBy('createdAt', 'desc')
    .limit(30);

  const unsubscribe = collectionRef.onSnapshot(
    (snap) => {
      console.log('snapshot');
      let results = [];
      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });

      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = "Couldn't detch data";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsubscribe());
  });

  return { documents, error };
};

export default getCollection;
