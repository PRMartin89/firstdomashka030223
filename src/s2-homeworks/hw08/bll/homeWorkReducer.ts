import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: any, action: any): any => { // need to fix any
    switch (action.type) {
        case 'sort': { // by name
            if(action.payload === 'up'){
                state = state.sort((a:any, b:any) => {
                    if(a.name > b.name) {
                        return 1
                    }else{
                        return -1
                    }
                })

            } else if(action.payload === 'down') {
                state = state.sort((a:any, b:any) => {
                    if(a.name < b.name) {
                        return 1
                    }else{
                        return -1
                    }
                })
            }
            return state
        }
        case 'check': {
            state = state.filter((el:any)=> el.age >= 18)
            state = state.sort((a:any, b:any) => a.name>b.name ?  1: -1)
            return state
        }
        default:
            return state
    }
}
