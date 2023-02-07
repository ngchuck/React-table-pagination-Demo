import { Person } from "../types";
import newPerson from "../constants/person";

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}
const makeData = (...lens: number[]) => {  //lens [100,2]
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]! //depth:0/1 len:100/2
    return range(len).map((): Person => {
      return {
        ...newPerson(),
      //   {firstName: "XYZ",
      //   lastName,
      //   age: 21,
      //   visits,
      //   progress,
      //   status
      // }[0]
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }
  return makeDataLevel()
}

export default makeData;
/*
[   { {firstName: "XYZ",
      lastName,
      age: 21,
      visits,
      progress,
      status
    }, {}
     
    { firstName,
      lastName,
      age,
      visits,
      progress,
      status
    },
    { firstName,
      lastName,
      age,
      visits,
      progress,
      status
    },
  
  ]
*/