import classNames from "classnames/bind";

import styles from "./card.module.scss";

const css = classNames.bind(styles);

interface CardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  className?: string;
  alt?: string;
}

const Card = ({
  imageUrl,
  title,
  subtitle,
  className,
  alt = "Card image",
}: CardProps) => {
  const isLoadingLogo = imageUrl.includes("react.svg");
  return (
    <div className={css("card", className)}>
      <div className={css("card-image-container")}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={alt}
            className={css("card-image", { logo: isLoadingLogo })}
          />
        )}
      </div>
      <div className={css("card-content")}>
        <h3 className={css("card-title")}>{title}</h3>
        {subtitle && <p className={css("card-subtitle")}>{subtitle}</p>}
      </div>
    </div>
  );
};

export default Card;
