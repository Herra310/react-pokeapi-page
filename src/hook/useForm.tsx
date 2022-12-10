import { useState } from "react";

//@ts-ignore
export const useForm = (initial = {}) =>{
    const [formState, setFormState] = useState(initial)

    //@ts-ignore
    const onInputChange = ({target}) =>{
        const {name, value} = target

        setFormState({
            ...formState, [name]: value
        })
    }

    const onResetForm = () => {
		setFormState(initial);
	};

	return {
		...formState,
		formState,
		onInputChange,
		onResetForm,
	};

}