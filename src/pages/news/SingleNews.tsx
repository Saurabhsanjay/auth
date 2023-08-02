
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import styles from '../../styles/News.module.css'
import { fetchNews } from '../../Redux/features/NewsSlice';
import { News } from '../../types/news';

const SingleNews = () => {
   
      const { newsData } = useAppSelector((state) => state.news);
      const dispatch = useAppDispatch();

    

      useEffect(() => {
        dispatch(fetchNews());
      }, []);
  return (
    <section className={styles.mainContainer}>
      {newsData?.map((el: News) => (
        <div className={styles.newsContainer}>
          <div className={styles.heading}>
            <h3>{el.author}</h3>
          </div>
          <div className={styles.infoContainer}>
            <div>
              <h3>{el.title}</h3>
              <p>{el.text}</p>
              <div></div>
            </div>
            <div>
              <img src={el.image} alt="" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default SingleNews
