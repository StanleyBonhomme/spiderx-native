import { useState, useEffect } from "react";
import db from "../services/firebase";

export default (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    db.collection(collection)
      .orderBy("imdb_score", "desc")
      .limit(50)
      .get()
      .then((snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => docs.push(doc.data()));
        setDocs(docs);
      });
  }, []);

  return docs;
};
