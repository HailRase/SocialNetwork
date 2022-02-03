import React from "react";
import s from './Contact.module.css'
import twitterIMG from './../../../../assets/images/contacts/twitter.png'
import facebookIMG from './../../../../assets/images/contacts/facebook.png'
import githubIMG from './../../../../assets/images/contacts/github.png'
import vkIMG from './../../../../assets/images/contacts/vk.png'
import instagramIMG from './../../../../assets/images/contacts/instagram.png'
import youtubeIMG from './../../../../assets/images/contacts/youtube.png'
import internetIMG from './../../../../assets/images/contacts/internet.png'


type ContactPropsType = {
    contactTitle: string
    contactValue: string
}
export const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    let imageURL: string

    switch (contactTitle) {
        case "youtube":
            imageURL = youtubeIMG
            break
        case "facebook":
            imageURL = facebookIMG
            break
        case "vk":
            imageURL = vkIMG
            break
        case "github":
            imageURL = githubIMG
            break
        case "instagram":
            imageURL = instagramIMG
            break
        case "twitter":
            imageURL = twitterIMG
            break
        default:
            imageURL = internetIMG
    }
    return (
        <div className={s.contact}>
            <div>
                <a href={contactValue}>
                    <img style={{width: "60%", height: "60%"}} src={imageURL} alt=""/>
                </a>
            </div>
        </div>
    )
}