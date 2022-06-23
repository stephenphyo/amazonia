import React, { useEffect, useState } from 'react';

function Tester() {

    const [data, setData] = useState({});
    const [arr, setArr] = useState([]);
    const [i, setI] = useState(0);

    useEffect(() => {
        console.log(data);
    })

    const increase = () => {
        setI(i + 1);
        setData({ ...data, [i]: 'new' });
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContents: 'center', flexDirection: 'column'}}>
            <button onClick={() => increase()}>Press Me</button>
            {
                arr.map((ele, index) => (
                    <>
                        <input placeholder={ele} />
                    </>
                ))
            }
        </div>
    );
}

export default Tester;