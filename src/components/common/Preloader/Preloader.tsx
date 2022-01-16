import React from "react";

export const Preloader = () => {
  return (
      <div style={{width: "100px", height: "100px", position:"absolute",top: "50%", left: "50%", zIndex :1}}>
          <img style={{width: '100px'}} src='https://i.gifer.com/XVo6.gif' alt=""/>
      </div>
  )
}