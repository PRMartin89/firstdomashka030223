const initState = {
    isLoading: false,
}

interface stateType  {
    isLoading: boolean
}

export const loadingReducer = (state = initState, action: { type: string, isLoading: boolean }): stateType => {
    switch (action.type) {
        case 'CHANGE_LOADING':
            return { isLoading: action.isLoading }
        default:
            return state
    }
}

type LoadingActionType = {
    type: 'CHANGE_LOADING'
    isLoading: boolean
}

export const loadingAC = (isLoading: boolean): LoadingActionType => ({
    type: 'CHANGE_LOADING',
    isLoading,
})
