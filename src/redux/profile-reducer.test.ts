import profileReducer, {addPost, deletePost, ProfilePageType} from "./profile-reducer";

let state: ProfilePageType = {
    posts: [
        {id: 1, text: 'Hi, how old are you?', likesCount: 10},
        {id: 2, text: 'It\'s my first post', likesCount: 15},
        {id: 3, text: 'How is your it-kamasutra?', likesCount: 20}
    ],
    userProfile: null,
    status: ''
}

it('length of post should be incremented',()=>{
    //1. test data
    let action = addPost('it-kamasutra.com')
    //2. action
    let newState: ProfilePageType = profileReducer(state, action)
    //3. expectation
    expect(newState.posts.length).toBe(4)
})

it('message of new post should be it-kamasutra.com',()=>{
    //1. test data
    let action = addPost('it-kamasutra.com')
    //2. action
    let newState: ProfilePageType = profileReducer(state, action)
    //3. expectation
    expect(newState.posts[3].text).toBe("it-kamasutra.com")
})

it('after deleting length of posts should be decrement',()=>{
    //1. test data
    let action = deletePost(1)
    //2. action
    let newState: ProfilePageType = profileReducer(state, action)
    //3. expectation
    expect(newState.posts.length).toBe(2)
})

it(`after deleting length of posts shouldn't be decrement`,()=>{
    //1. test data
    let action = deletePost(1000)
    //2. action
    let newState: ProfilePageType = profileReducer(state, action)
    //3. expectation
    expect(newState.posts.length).toBe(3)
})