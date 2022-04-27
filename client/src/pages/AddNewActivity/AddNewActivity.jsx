import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Input from '../../components/Input/Input'
import { API_URL } from '../../config';
import './AddNewActivity.scss'

function AddNewActivity(props) {

    const [invalid, setInvalid] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(sessionStorage.getItem('authToken'))
    }, [])

    // similar approach for category/activity list as username list check when signing up:
    // const [usernameList, setUsernameList] = useState([]);
    // get list of activities to populate dropdown lists here
    // useEffect(() => {
    //     axios.get(API_URL + '/users/get-users')
    //         .then(response => {
    //             const usernameListArr = [...new Set(response.data.map(item => item.username))]
    //             setUsernameList(usernameListArr)
    //         })
    // }, [])
    
    const handleAddActivity = (e) => {
        e.preventDefault();
        
        // reinitialise for subsequent attempts
        setInvalid(false)
        setSubmitted(false)

        let actName = e.target.activity.value
        let actCategory = e.target.category.value
        let actSubCategory = e.target.subcategory.value
        let actOption = e.target.option.value
        let actUnit = e.target.unit.value
        let actQty = e.target.qty.value
        let actCarbon = e.target.carbon.value
        let actNotes = e.target.notes.value
        
        // input validation
        if (!actName || !actCategory || !actOption || !actUnit || !actQty || !actCarbon ) {
            return setInvalid(true)
        }
        
        // submit to database
        axios.post(API_URL + '/activities/add-new-activity', {
            "activity": actName,
            "category": actCategory,
            "sub_category": actSubCategory,
            "option": actOption,
            "unit": actUnit,
            "qty": actQty,
            "carbon": actCarbon,
            "notes": actNotes,
        }, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => {
            e.target.activity.value = ""
            e.target.category.value = ""
            e.target.subcategory.value = ""
            e.target.option.value = ""
            e.target.unit.value = ""
            e.target.qty.value = 1
            e.target.carbon.value = ""
            e.target.notes.value = ""
            setSubmitted(true)
        })
        .catch(error => console.log(error))
    }

    return (
        <>
        <section className="new-activity">
            <div className="new-activity__container">
                <h1 className="new-activity__header">Add new activity to database</h1>
                <form onSubmit={handleAddActivity}>
                    <div className="new-activity__columns-wrapper">
                        <div className="new-activity__column">
                            <Input label="Activity" name="activity" type="text" invalid={invalid} placeholder="Required"/>
                            <Input label="Option" name="option" type="text" invalid={invalid} placeholder="Required"/>
                            <Input label="Unit" name="unit" type="text" invalid={invalid} placeholder="Required"/>
                            <Input label="Carbon Emissions (kg)" name="carbon" type="text" invalid={invalid} placeholder="Required" />
                        </div>
                        <div className="new-activity__column">
                            <Input label="Category" name="category" type="text" invalid={invalid} placeholder="Required"/>
                            <Input label="Sub-Category" name="subcategory" type="text"  placeholder="Optional"/>
                            <Input label="Quantity" name="qty" type="number" value="1" defaultValue={1} invalid={invalid} placeholder="Required"/>
                            <Input label="Notes" name="notes" type="text" placeholder="Optional"/>
                            {invalid ? <p className="new-activity__invalid">Please provide all required fields</p> : <></> }
                            {/* {usernameTaken ? <p className="new-activity__invalid">Username already in use, please provide another</p> : <></> } */}
                            {/* {passwordMatch ? <></> : <p className="new-activity__invalid">Passwords did not match</p> } */}
                        </div>
                    </div>
                    <div className="new-activity__links">
                        <button className="new-activity__button" type="submit">Submit</button>
                    </div>
                </form>
                {submitted ? <div className="new-activity__submitted"><p>Activity added to database.</p></div> : "" }
            </div>
        </section>
        </>
    )
}

export default AddNewActivity
