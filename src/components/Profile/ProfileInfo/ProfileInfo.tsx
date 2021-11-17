import React from 'react';
import s from './ProfileInfo.module.css';

function ProfileInfo() {
    return (
        <div>
            <div>
                <img
                    src="https://sebweo.com/wp-content/uploads/2019/06/landshaft-bernskikh-alp-v-yasniy-den_thumb.jpg"
                    alt=""/>
            </div>
            <div className={s.descriptionBlog}>
                <img src="" alt=""/>ava + description
            </div>
        </div>
    );
}

export default ProfileInfo;