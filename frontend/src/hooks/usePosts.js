import { useEffect, useState } from "react";
import { getUserById } from "../utils/api";

export default function usePosts(selectedCategory, currentPage, pageSize) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState({});
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setLoading(true);

    let url;
    if (selectedCategory === "all") {
      url = `http://localhost:9090/api/posts?pageNumber=${currentPage}&pageSize=${pageSize}`;
    } else {
      url = `http://localhost:9090/api/category/${selectedCategory}/posts`;
    }

    fetch(url)
      .then((res) => res.json())
      .then(async (data) => {
        let postList;
        let totalPagesCount = 1;

        if (selectedCategory === "all") {
          postList = data.content || [];
          totalPagesCount = data.totalPages || 1;
        } else {
          postList = Array.isArray(data) ? data : [];
          totalPagesCount = Math.ceil(postList.length / pageSize);
          const startIndex = currentPage * pageSize;
          const endIndex = startIndex + pageSize;
          postList = postList.slice(startIndex, endIndex);
        }

        setPosts(postList);
        setTotalPages(totalPagesCount);

        // Fetch authors for the posts
        const newAuthors = {};
        for (const post of postList) {
          const name = await getUserById(post.userId);
          newAuthors[post.postId] = name;
        }
        setAuthors(newAuthors);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, [selectedCategory, currentPage, pageSize]);

  return { posts, loading, authors, totalPages };
}
