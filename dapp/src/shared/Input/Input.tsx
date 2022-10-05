import "./Input.css";

interface InputProps {
    text:string,
    placeholder:string,
}
export const Input = ({text,placeholder}: InputProps) => {
	return (
		<div className="form__group">
			<input
				type="text"
				className="form__input"
				id={text}
				placeholder={placeholder}
				required
                name={text}
			/>
			<label htmlFor={text} className="form__label">
				{placeholder}
			</label>
		</div>
	);
};
