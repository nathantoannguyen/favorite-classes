
import "./Class.css";
import React, {useState, useEffect} from 'react';

function ClassGraphQL(props) {

    const [classInfo, setClassInfo] = useState({});

    const PeterPortalurl = "https://api.peterportal.org/graphql"

    useEffect(() => {
        const fetchData = async () => {
            const query = `
                query {
                    course(id:"${props.name}") {
                        title
                        department_name
                        description
                    }
                }
            `

            const response = await fetch(PeterPortalurl, {
                method: "POST", 
                body: JSON.stringify({query}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            console.log(data);
            setClassInfo(data.data.course);

        }
        fetchData();
    }, [props.name]);
    let info;
    if (classInfo) {
        info = <div className="information">
        <p id="title"> {classInfo.title} </p>
        <p id="department"> {classInfo.department} </p>
        <p id="description"> {classInfo.description} </p>
    </div>
    } else if (classInfo == null) {
        info = <p>Class Not Found</p>
    } else {
        info = <p>Loading...</p>
    }
  
    return (
        <div className="class">
            {props.name}
            <div>
                {info}
            </div>
        </div>
    )
}

export default ClassGraphQL;