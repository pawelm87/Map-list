const peopleFromServer = [
    {
        id: 1,
        firstName: 'paul',
        lastName: 'kow',
        age: 31,
        address: []
    },
    {
        id: 2,
        firstName: 'luke',
        lastName: 'kow',
        age: 33,
        address: []
    },
    {
        id: 3,
        firstName: 'kris',
        lastName: 'now',
        age: 41,
        address: []
    },
    {
        id: 4,
        firstName: 'anna',
        lastName: 'tom',
        age: 31,
        address: []
    },
    {
        id: 5,
        firstName: 'luka',
        lastName: 'kow',
        age: 33,
        address: []
    },
];

const addressPeopleFromServer = [
    {
        id: 1,
        contactId: 1,
        city: 'bial',
        street: 'bial',
        number: 10
    },
    {
        id: 2,
        contactId: 2,
        city: 'bial',
        street: 'zwierz',
        number: 15
    },
    {
        id: 3,
        contactId: 3,
        city: 'war',
        street: 'wie',
        number: 99
    },
    {
        id: 4,
        contactId: 4,
        city: 'wroc',
        street: 'wroc',
        number: 10
    },
    {
        id: 5,
        contactId: 5,
        city: 'agu',
        street: 'most',
        number: 12
    },
    {
        id: 1,
        contactId: 1,
        city: 'war',
        street: 'war',
        number: 101
    },
]

function addAdressToPerson(map, adressPeople){
    const mapPeopleWithAddress = copyMap(map);
    for(let lastName of mapPeopleWithAddress.values()){
        lastName.forEach(person => {
            for(let address of adressPeople){
                if(person.id === address.contactId){
                    person.address.push(address);
                }
            }
        });
    }
    return mapPeopleWithAddress;
}

function getPersonById(map, id) {
    for(let people of map.values()) {
        for(let person of people){
            if(person.id === id) {
                return person;
            }
        }
    } 
}

function addPersonToMap(map, person) {
    const copyOfMapToAdd = copyMap(map);
    if(copyOfMapToAdd.has(person.lastName)){
        const people = copyOfMapToAdd.get(person.lastName);
        if(!checkIfDuplicate(people, person)){
            people.push(person);
        }
    } else {
        copyOfMapToAdd.set(person.lastName, [person]);
    }
    return copyOfMapToAdd;
}

function copyMap(map) {
    const copyOfMap = new Map();
    for (let lastName of map.keys()) {
        const people = [];
        copyOfMap.set(lastName, people);
        for(let person of map.get(lastName)){
            people.push(person);
        }
    }   
    return copyOfMap; 
}

function makeMap(peopleFromServer) {
    let mapOfPeople = new Map();

    for(let i = 0; i < peopleFromServer.length; i++) {
        const personFormSerwer = peopleFromServer[i];
        const lastNameOfPerson = personFormSerwer.lastName;

        if(mapOfPeople.has(lastNameOfPerson)) {
            if(!checkIfDuplicate(mapOfPeople.get(lastNameOfPerson), personFormSerwer)) {
                mapOfPeople.get(lastNameOfPerson).push(personFormSerwer);
            }
        } else {
                mapOfPeople.set(lastNameOfPerson, [personFormSerwer]);
            }
        }
    return mapOfPeople;
}

function checkIfDuplicate(people, person) {
    for(let j = 0;  j <people.length; j++) {
        if(compareToPerson(people[j], person)){
            return true;
        }
    }
    return false;
}

function compareToPerson(existPerson, newPerson) {
    return (existPerson.firstName === newPerson.firstName && existPerson.lastName == newPerson.lastName 
        && existPerson.age === newPerson.age);
}
