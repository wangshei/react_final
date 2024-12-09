export default function InputField(props){
    const text = props.value 
    const placeholder = props.placeholder
    return (
    <div className="">
    <label htmlFor={props.id} className="form-label">
      {props.label}  
    </label>
    <br/>
    <input 
       type="text"
       placeholder={placeholder}
       className="w-[100%] h-[40px] rounded-tr-[30px] border border-dark_blue bg-paper_white p-2 font-sans" 
       id={props.id}
       value = {text} //controlled component
    //    onChange = {props.onChange}
       onChange={(event)=> {
            const value = event.target.value;
            props.onChange(value);
       }}
       />
        <span className="text-red-500 text-sm">{props.error}</span>
  </div>
  )
}