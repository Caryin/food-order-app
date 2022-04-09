import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import HeaderImage from '../../assets/meals.jpeg';

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Food App</h1>
        <HeaderCartButton onShowCart={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={HeaderImage} />
      </div>
    </>
  );
};

export default Header;
