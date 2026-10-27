import styles from "./EraContent.module.css";

export default function EraContentUI({
  year,
  title,
  description,
  images,
}) {
  return (
    <article className={styles.eraContent}>
      <header className={styles.header}>
        <span className={styles.year}>
          {year}
        </span>

        <h2 className={styles.title}>
          {title}
        </h2>
      </header>

      <p className={styles.description}>
        {description}
      </p>

      <div className={styles.gallery}>
        {images.map((image, index) => (
          <img
            key={`${year}-${index}`}
            src={image.src}
            alt={image.alt || ""}
            className={styles.image}
            loading="lazy"
          />
        ))}
      </div>
    </article>
  );
}
