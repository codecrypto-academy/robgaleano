import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Button from '@/components/button/button';

import styles from './page-not-found.module.scss';

const css = classNames.bind(styles);

const PageNotFound = () => {
  return (
    <div className={css('not-found-container')}>
      <h1>404</h1>
      <div className={css('not-found-content')}>
        <img
          src="https://github.githubassets.com/images/icons/emoji/unicode/1f635.png"
          alt="Page not found"
          className={css('emoji')}
        />
        <h2>This is not the web page you are looking for.</h2>
        <Link to="/">
          <Button variant="primary" size="large">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
