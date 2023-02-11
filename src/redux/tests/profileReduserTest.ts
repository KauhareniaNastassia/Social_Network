import {addPostAC, AddPostActionType, deletePostAC, PostType, profilePageReducer} from "../profilePageReducer";


/*
it('new post should be added', () => {
    //test data
    let action = addPostAC()

    let state = {
        posts: [
            {
                id: '1',
                message: "Hi, how are you?",
                likesCount: 15
            },
            {
                id: '2',
                message: "It is my first post",
                likesCount: 5
            },
            {
                id: '3',
                message: "My dog is the best dog ever",
                likesCount: 7
            },
            {
                id: '4',
                message: "Such a beautiful squirrel",
                likesCount: 18
            },
        ] as PostType[],
        newPostText: '',
        profile: null,
        status: ''
    }

//action
        let newState = profilePageReducer(state, {action})

    //expectation
    expect(newState.posts.length).toBe(5)
})



it('after deleting length of messages should be decrementing', () => {
    //test data
    let action = deletePostAC('1')

    let state = {
        posts: [
            {
                id: '1',
                message: "Hi, how are you?",
                likesCount: 15
            },
            {
                id: '2',
                message: "It is my first post",
                likesCount: 5
            },
            {
                id: '3',
                message: "My dog is the best dog ever",
                likesCount: 7
            },
            {
                id: '4',
                message: "Such a beautiful squirrel",
                likesCount: 18
            },
        ] as PostType[],
        newPostText: '',
        profile: null,
        status: ''
    }

//action
    let newState = profilePageReducer(state, {action})

    //expectation
    expect(newState.posts.length).toBe(3)
})*/
