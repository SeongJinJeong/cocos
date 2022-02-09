// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Settings from "./Settings";
import Player from "./Player"

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Toggle)
    soundEnable : cc.Toggle = null;
    
    @property(cc.EditBox)
    starDuration : cc.EditBox = null;

    @property(cc.EditBox)
    accel : cc.EditBox = null;

    @property(cc.Button)
    closeButton : cc.Button = null;

    SettingNode :  cc.Node & Settings = null;
    PlayerNode : cc.Node & Player = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.starDuration.placeholder = this.node.parent.getComponent("Game").minStarDuration;
        this.accel.placeholder = this.node.parent.getComponent("Game").player.accel;

        this.closeButton.node.on('click',this.handleSaveClick, this)
        this.SettingNode = this.node.parent.getChildByName("Setting").getComponent("Settings");
        this.PlayerNode = this.node.parent.getChildByName("Player").getComponent("Player")
    }

    handleSaveClick(event){
        console.log( this.starDuration.string,  this.accel.string)
        this.toggleHandler(this.soundEnable.isChecked) // Sound 설정
        this.PlayerNode.accel = this.accel.string? parseInt(this.accel.string) : this.PlayerNode.accel; // accel 값 설정
        this.node.parent.getComponent("Game").minStarDuration = this.starDuration.string?parseInt(this.starDuration.string) : this.node.parent.getComponent("Game").minStarDuration; // 
        this.SettingNode.handlePopUpClose();
        console.log(this.node.parent.getChildByName("Setting").getComponent("Settings"))
    }

    toggleHandler(toggle){ // isChecked?
        toggle ? cc.audioEngine.setEffectsVolume(1) : cc.audioEngine.setEffectsVolume(0);
    }

    start () {

    }

    // update (dt) {}
}
