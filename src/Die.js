import React from "react"
import './index.css';
import bg1 from "./images/1.png";
import bg2 from "./images/2.png";
import bg3 from "./images/3.png";
import bg4 from "./images/4.png";
import bg5 from "./images/5.png";
import bg6 from "./images/6.png";


export default function Die(props) {
    const image = function(){
        switch(props.value){
            case 1:
                return bg1
            case 2:
                return bg2
            case 3:
                return bg3
            case 4:
                return bg4
            case 5:
                return bg5
            case 6:
                return bg6
        }
    }
    const styles = {
        backgroundImage: `url(${image()})`,
        backgroundSize: "cover"
    }
    return (
        <div 
            className={ props.isHeld? "die-face-held" : "die-face"} 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="die-num"></h2>
        </div>
    )
}