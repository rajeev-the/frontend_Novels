import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReadContent = () => {
  const { id, chapter_id } = useParams();
  const [data, setData] = useState(null); // Null for initial state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getnovels = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://novels1.pythonanywhere.com/api/novels/');
        const novel = response.data.find((novel) => novel.id === parseInt(id));

        if (novel) {
          const chapter = novel.chapters.find(
            (chapter) => chapter.id === parseInt(chapter_id)
          );

          if (chapter) {
            setData(chapter);
          } else {
            setError('Chapter not found.');
          }
        } else {
          setError('Novel not found.');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load content.');
      } finally {
        setLoading(false);
      }
    };

    getnovels();
  }, [id, chapter_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img
            src="https://cdn.vectorstock.com/i/750p/23/77/book-icon-logo-vector-2982377.avif"
            width={30}
            height={30}
            className="d-inline-block align-top"
            alt=""
          />
          Novels
        </a>
      </nav>

      <div className="m-3 mt-3">
              <div className="badge text-bg-primary text-xl " style={{ width: "auto",  height:"auto"}}>
              {data?.title}
              </div>

        <p className="text-xl-end  mt-6">{data?.content}</p>
      </div>
    </>
  );
};

export default ReadContent;
