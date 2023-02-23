import React, {useState} from "react";
import css from "./Post.module.scss"
import ava1 from '../../../../assets/img/ava1.jpg'
import like from '../../../../assets/img/unActiveLike.svg'
import activeLike from '../../../../assets/img/activeLike.svg'
import {PhotosType} from "../../../../api/usersAPI";
import {ProfilePhotosResponseType} from "../../../../api/profileAPI";


type PostPropsType = {
    message: string
    likesCount: number
    userPhoto: ProfilePhotosResponseType | undefined
}

export const Post: React.FC<PostPropsType> = ({
                                                  userPhoto,
                                                  likesCount,
                                                  message
                                              }) => {

    const [likeBTN, setLikeBTN] = useState<boolean>(false)
    const [likes, setLikes] = useState(likesCount)

    const onClickLikedBTNHandler = () => {
        setLikeBTN(!likeBTN)

        if(likeBTN) {
            setLikes(likes - 1)
        } else {
            setLikes(likes + 1)
        }


    }


    return (
        <div className={css.item}>
            <div className={css.postInfo}>
                <img
                    src={userPhoto?.small ? userPhoto.small : ava1}
                    alt='userPhoto'
                    className={css.postInfo_img}
                />
                <div className={css.postInfo_message}>
                    {message}
                </div>
            </div>


            <div className={css.post_likeBlock}>
                <button
                    className={!likeBTN ? css.post__likeBtn : `${css.post__likeBtn} ${css.post__likeBtn_active}`}
                    onClick={onClickLikedBTNHandler}

                >

                    <img className={css.post__likeBtn_img} src={!likeBTN ? like : activeLike}/>
                    <span>
                        {likes}
                    </span>


                </button>

            </div>


        </div>

    )
}