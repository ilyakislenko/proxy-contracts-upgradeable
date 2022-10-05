import { Button } from '../../shared/Button/Button';
import { Input } from '../../shared/Input/Input';
import './ContractFactory.css';
interface ContractFactoryProps {
	useContract: (e: React.SyntheticEvent<HTMLFormElement>) => void;
    isLoading:Boolean,
}
export const ContractFactory = ({useContract,isLoading} : ContractFactoryProps) => {
	return (
		<div className="factory-container">
            <form className='flex-form' onSubmit={useContract}>
                <Input text={'name'} placeholder={'Contract name'}/>
                <Input text={'symbol'} placeholder={'Token symbol'}/>
                <Input text={'supply'} placeholder={'Initial supply'}/>
                <Button text={"Send"} isDisabled={isLoading}/>
            </form>
        </div>
	);
};


