export default function RadioButton(props){
    return (
      <span className="">
        <span className="pr-6">
            {props.name} 
        </span>
        {props.options.map((option) => (
        <span key={option.value}>
          <input
          className="form-check-input"
          type="radio"
          defaultValue={0}
          name={props.name}
          value={option.value}
          checked = {props.value == option.value} 
          onChange = {(event)=>{
            props.onChange(event.target.value);
          }}
        />
        <label
          className="form-check-label"
          htmlFor={option.value}
          style={{marginRight: "20px", marginLeft: "5px"}}
        >
          {option.label}
      </label>
      
      </span>
        ))}
         <span className="text-red-500 text-sm">{props.error}</span>
    </span>

    )
}