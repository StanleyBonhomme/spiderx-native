import { useState, useEffect } from "react";
import db from "../services/firebase";

export default (doc) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    db.collection(`genres/${doc}/results`)
      .orderBy("imdb_score", "desc")
      .limit(10)
      .get()
      .then((snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => docs.push(doc.data()));
        setDocs(docs);
      });
  }, [doc]);

  return docs;
};
