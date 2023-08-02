import { useEffect, useState } from "react";
import styles from "../../styles/News.module.css";

import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { fetchNews } from "../../Redux/features/NewsSlice";
import { News } from "../../types/news";

const NewsPage = () => {
  const [showFirstSection, setShowFirstSection] = useState<boolean>(true);
  const { newsData } = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();

  const toggleSections = () => {
    setShowFirstSection((prevShowFirstSection) => !prevShowFirstSection);
  };

  useEffect(() => {
    dispatch(fetchNews());
  }, []);
  
function truncateText(text: string, maxWords: number = 50): string {
  const words = text.split(" ");
  const truncatedText = words.slice(0, maxWords).join(" ");
  if (words.length > maxWords) {
    return `${truncatedText}...`;
  }
  return truncatedText;
}
  return (
    <div>
      <div className={styles.button}>
        <button onClick={toggleSections}>Toggle List</button>
      </div>
      {showFirstSection ? (
        <section className={styles.mainContainer}>
          {newsData?.map((el: News) => (
            <div className={styles.newsContainer}>
              <div className={styles.heading}>
                <h3>{el.author}</h3>
              </div>
              <div className={styles.infoContainer}>
                <div>
                  <h3>{el.title}</h3>
                  <p>{truncateText(el.text,50)}</p>
                  <div></div>
                </div>
                <div>
                  <img src={el.image} alt="" />
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className={styles.news2Container}>
          {newsData?.map((el: News) => (
            <div className={styles.movie_card}>
              <img width="100px" src={el.image} alt="error" />
              <div className={styles.movie_details}>
                <h3>{el.title}</h3>
                <p>{el.text}</p>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default NewsPage;
