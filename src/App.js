
import './styles.css';
import React, {useState, useEffect} from 'react';




function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const url = "https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json"

    let maleOwners
    let femaleOwners
    let maleCats = []
    let femaleCats = []

    const sortPet = (genderOwners, arr) => {
        for (let i = 0; i < genderOwners.length ; i++) {
            if (genderOwners[i].pets !== null) {
                for (let j = 0; j < genderOwners[i].pets.length ; j++) {
                    if (genderOwners[i].pets[j].type == "Cat") {
                        arr.push(genderOwners[i].pets[j].name)
                    }
                }
            }
        }
    }


    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setData(data)
                setLoading(false)
        })
            .catch((error) => {
                console.error('Error:', error);
        });

        }, []);


        if(!loading) {
            maleOwners = data?.filter(person => person.gender === "Male")
            femaleOwners = data?.filter(person => person.gender === "Female")
            sortPet(maleOwners, maleCats)
            sortPet(femaleOwners, femaleCats)
        }


        const sortedMale = maleCats.sort()
        const sortedFemale = femaleCats.sort()



        
        
        


    return (
        <>
        { loading ? <div>Loading...</div> :
        <div className="App">
            <div className="wrapper">
                <div className="box">
                    <h1>Male</h1>
                    {sortedMale.length > 0 && sortedMale.map((pet, i) => (
                        <div key={pet + i}>{pet}</div>
                    ))}
                </div>
                <div className="box">
                    <h1>Female</h1>
                    {sortedFemale.length > 0 && sortedFemale.map((pet, i) => (
                        <div key={pet + i}>{pet}</div>
                    ))}
                </div>
            </div>
        </div>
        }
        </>
    );
    }

export default App;
