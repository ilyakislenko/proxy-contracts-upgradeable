import "./Button.css";
interface ButtonProps {
	text: string;
	handleClick: () => void | Promise<void>;
}
export const Button = (props: ButtonProps) => {
    const {handleClick, text} = props;
	return (
		<button className="btn-primary" onClick={handleClick}>
			{text}
		</button>
	);
};
