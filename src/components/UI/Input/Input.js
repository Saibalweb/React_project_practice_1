import classes from './Input.module.css'
const Input = (props)=>{
    return( <div
        className={`${classes.control} ${
          props.isValid === false ? classes.invalid : ''
        }`}
      >
        <label htmlFor={props.email}>{props.email}</label>
        <input
          type={props.email}
          id={props.id}
          value={props.value}
          onChange={props.emailChangeHandler}
          onBlur={props.validateEmailHandler}
        />
      </div>);
};
export default Input;