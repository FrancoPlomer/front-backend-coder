import { useState } from 'react';


export const useForm = ( initialstate = {} ) => {
    
    const [values, setvalues] = useState(initialstate);

    const reset = () => {
        setvalues( initialstate );
    }


    const handleInputChange = ({ target }) => {

        setvalues({
            ...values,
            [ target.name ]: target.value
        });

    }

    const handleInputChangeImg = ({ target }) => {
        const [ file ] = target.files
        console.log(file)

        setvalues({
            ...values,
            [ target.name ]: file
        });

    }

    return [ values, handleInputChange, handleInputChangeImg, reset ];

}
