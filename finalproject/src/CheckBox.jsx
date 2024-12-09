export default function Checkbox(props){
    return (
      <div className=" ">
        <div className=" ">
        <input 
          className="mr-4 bg-paper_white" 
          type="checkbox" 
          id="{prop.id}" 
          checked={props.value}//controlled component
          onChange = {(event)=>{
            props.onChange(event.target.checked);
          }}
          />
        <label className="form-label">{props.label}</label>
        <span className="text-red-500 text-sm">{props.error}</span>
      </div>
      </div>
    )
  }