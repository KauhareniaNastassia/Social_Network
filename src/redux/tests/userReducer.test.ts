import {initialStateUsersPageType, usersPageActions, UsersPageActionsType, usersPageReducer} from "../usersPageReducer";

let state: initialStateUsersPageType
beforeEach( () => {
    state = {
        users: [
            {id: 0, name: 'Nastassia 0', followed: false, status: '', photos: {large: null, small: null}},
            {id: 1, name: 'Nastassia 1', followed: false, status: '', photos: {large: null, small: null}},
            {id: 2, name: 'Nastassia 2', followed: true, status: '', photos: {large: null, small: null}},
            {id: 3, name: 'Nastassia 3', followed: true, status: '', photos: {large: null, small: null}}
        ],
        pageSize: 20,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        followingInProgress: [],
        filter: {
            term: '',
            friend: null as null | boolean
        }
    }
})



test('follow success', () => {

    const newState = usersPageReducer(state, usersPageActions.followActionCreator(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {

    const newState = usersPageReducer(state, usersPageActions.unfollowActionCreator(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})