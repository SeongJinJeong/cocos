// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Game from "./Game"

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    popUp: cc.Node = null;

    game : cc.Node & Game = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.popUp.active = false;
        this.game = this.node.parent.getComponent("Game");
        this.node.on(cc.Node.EventType.MOUSE_DOWN,this.handlePopUpOpen,this);
    }

    handlePopUpOpen(event){
        this.popUp.active = true; // 팝업 키고
        this.popUp.zIndex = 1; // z-Order 최상위로 올리고
        this.game.isPlaying = false; 
        this.game.player.enabled = false;
        this.game.player.pauseMove();
        this.game.currentStar.pauseAllActions();
        this.node.pauseSystemEvents(true);

        console.log(cc.audioEngine.getEffectsVolume());
        
    }

    handlePopUpClose(){
        this.popUp.active = false;
        this.game.isPlaying = true;
        this.game.player.enabled = true;
        this.game.player.resumeMove()
        this.game.currentStar.resumeAllActions();
        this.node.resumeSystemEvents(true);
    }

    start () {

    }

    // update (dt) {}
}
