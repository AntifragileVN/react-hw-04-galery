import { TailSpin } from 'react-loader-spinner';

export default function Loader() {
	return (
		<TailSpin
			height={90}
			width={90}
			color="black"
			radius="1"
			wrapperStyle={{}}
			wrapperClass=""
			visible={true}
		/>
	);
}
