import React, {useState, useEffect} from 'react'
import {
    FaEnvelopeOpen, FaUser, FaCalendarTimes, FaMap, FaPhone, FaLock,
} from 'react-icons/fa'
import axios from "axios";

const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'

const App = () => {
    const [loading, setLoading] = useState(true);
    const [person, setPerson] = useState(null);
    const [title, setTitle] = useState('name');
    const [value, setValue] = useState('random person')

    const getPerson = async () => {
        try {
            const {data} = await axios.get(url);
            const {phone, email} = data.results[0]
            const {large: image} = data.results[0].picture;
            const {login: {password}} = data.results[0];
            const {first, last} = data.results[0].name;
            const {dob: {age}} = data.results[0];
            const {street: {number, name}} = data.results[0].location;

            const newPerson = {
                image,
                phone,
                email,
                password,
                age,
                street: `${number} ${name}`,
                name: `${first} ${last}`
            }

            setPerson(newPerson)
            setLoading(false)
            setTitle('name')
            setValue(newPerson.name)

        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    useEffect(() => {
        getPerson();
    }, [])

    const handleValue = (e) => {
       if(e.target.classList.contains('icon')){
           const valueKey = e.target.dataset.label
           setTitle(valueKey)
           setValue(person[valueKey])
       }
    }

    return (
        <main>
            <div className="block bcg-black">

            </div>
            <div className='block'>
                <div className='container'>
                    <img src={(person && person.image) || defaultImage} alt="random user" className='user-img'/>
                    <p className='user-title'>my {title} is</p>
                    <p className='user-value'>{value}</p>
                    <div className="values-list">
                        <button className='icon' data-label="name" onMouseOver={handleValue}>
                            <FaUser/>
                        </button>
                        <button className='icon' data-label="email" onMouseOver={handleValue}>
                            <FaEnvelopeOpen/>
                        </button>
                        <button className='icon' data-label="age" onMouseOver={handleValue}>
                            <FaCalendarTimes/>
                        </button>
                        <button className='icon' data-label="street" onMouseOver={handleValue}>
                            <FaMap/>
                        </button>
                        <button className='icon' data-label="phone" onMouseOver={handleValue}>
                            <FaPhone/>
                        </button>
                        <button className='icon' data-label="password" onMouseOver={handleValue}>
                            <FaLock/>
                        </button>
                    </div>
                    <button className='btn' type='button' onClick={getPerson}>
                        {loading ? 'loading...' : 'random user'}
                    </button>
                </div>
            </div>
        </main>
    )
}

export default App
