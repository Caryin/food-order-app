//hooks
import useInput from '../../hooks/use-input';

//css
import classes from './Checkout.module.css';

const valueIsNotEmpty = (value) => value.trim() !== '';

const Checkout = (props) => {
  const {
    value: name,
    isValid: nameIsValid,
    error: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetName,
  } = useInput(valueIsNotEmpty);

  const {
    value: address,
    isValid: addressIsValid,
    error: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressInputBlurHandler,
    reset: resetAddress,
  } = useInput(valueIsNotEmpty);

  const {
    value: mobile,
    isValid: mobileIsValid,
    error: mobileHasError,
    valueChangeHandler: mobileChangeHandler,
    inputBlurHandler: mobileInputBlurHandler,
    reset: resetMobile,
  } = useInput(valueIsNotEmpty);

  let formIsValid = false;

  if (nameIsValid && addressIsValid && mobileIsValid) {
    formIsValid = true;
  }

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    resetName();
    resetAddress();
    resetMobile();

    props.onConfirm({
      name: name,
      address: address,
      mobile: mobile,
    });
  };

  return (
    <form onSubmit={submitFormHandler}>
      <div
        className={`${classes.control} ${nameHasError ? classes.invalid : ''}`}
      >
        <label htmlFor='name'>Your Name:</label>
        <input
          type='text'
          id='name'
          onChange={nameChangeHandler}
          onBlur={nameInputBlurHandler}
          value={name}
        />
      </div>
      {nameHasError && <p>Please enter a valid name.</p>}

      <div
        className={`${classes.control} ${
          addressHasError ? classes.invalid : ''
        }`}
      >
        <label htmlFor='address'>Address:</label>
        <input
          type='text'
          id='address'
          value={address}
          onChange={addressChangeHandler}
          onBlur={addressInputBlurHandler}
        />
      </div>
      {addressHasError && <p>Please enter a valid address.</p>}

      <div
        className={`${classes.control} ${
          mobileHasError ? classes.invalid : ''
        }`}
      >
        <label htmlFor='mobileNumber'>Mobile No.:</label>
        <input
          type='number'
          id='mobileNumber'
          value={mobile}
          onChange={mobileChangeHandler}
          onBlur={mobileInputBlurHandler}
        />
      </div>
      {mobileHasError && (
        <p>Please enter a valid mobile no. (without " - ").</p>
      )}

      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
