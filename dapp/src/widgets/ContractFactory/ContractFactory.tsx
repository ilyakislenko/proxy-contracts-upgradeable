import './ContractFactory.css';
interface ContractFactoryProps {
	useContract: (e: React.SyntheticEvent<HTMLFormElement>) => void;
}
export const ContractFactory = ({useContract} : ContractFactoryProps) => {
	return (
		<div className="factory-container">
            <h3>You can create contract here</h3>
            <form className='flex-form' onSubmit={useContract}>
                <div className='flex-container'>
                    <label>Contract name</label>
                    <input type='name' name='name'></input>
                </div>
                <div className='flex-container'>
                    <label>Token symbol</label>
                    <input type='symbol' name='symbol'></input>
                </div>
                <div className='flex-container'>
                    <label>Initial supply</label>
                    <input type='supply' name='supply'></input>
                </div>
                <button className='btn-primary'>Send</button>
            </form>
        </div>
	);
};


