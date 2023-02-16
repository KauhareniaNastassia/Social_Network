import {
    followUsersThunkCreator,
    unFollowUsersThunkCreator,
    usersPageActions,
    usersPageReducer
} from "../usersPageReducer";
import {usersAPI} from "../../api/usersAPI";
import {ResultCodeEnum} from "../../api/authAPI";

jest.mock("../../api/usersAPI")
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>


const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})


const result:{ data: {}; resultCode: ResultCodeEnum; messages: any[] } = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}

userAPIMock.followUser.mockReturnValue(Promise.resolve(result))

test('follow thunk success', async () => {

    const thunk = followUsersThunkCreator(1)


    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)

})

test('unfollow thunk success', async () => {

    const thunk = unFollowUsersThunkCreator(2)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)

})