import css from './loading.module.css';

const Loader = () => {
  return <div className={css.loaderWrapper}>
      <span className={css.loader}></span>
  </div>;
};

export default Loader;
