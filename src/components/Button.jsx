function Button(props) {
  return (
    <button {...props} className={`bg-slate-400 p-2 rounded-md text-white ${props.className || ''}`}>
      {props.children}
    </button>
  );
}

export default Button;
