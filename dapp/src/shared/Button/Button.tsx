import "./Button.css";
interface ButtonProps {
	text: string;
	handleClick?: () => void | Promise<void>;
	isDisabled?:Boolean
}
export const Button = (props: ButtonProps) => {
	const { handleClick, text, isDisabled } = props;
	return (
		<div className="center">
			<button className="btn" onClick={handleClick} disabled={isDisabled && true}>
				<svg
					width="180px"
					height="60px"
					viewBox="0 0 180 60"
					className="border"
				>
					<polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
					<polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
				</svg>
				<span>{text}</span>
			</button>
		</div>
	);
};
