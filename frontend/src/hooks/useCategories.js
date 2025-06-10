import { useEffect, useState } from "react";

export default function useCategories() {
  const [categories, setCategories] = useState({});
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9090/api/categories/")
      .then((res) => res.json())
      .then((data) => {
        setAllCategories(data);
        const categoriesObj = {};
        data.forEach((cat) => {
          categoriesObj[cat.categoryId] = cat.categoryTitle;
        });
        setCategories(categoriesObj);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return { categories, allCategories };
}
