import { _decorator, Component, Node, Prefab, resources, Sprite, SpriteFrame, RigidBody2D } from 'cc';
import {puckColor} from './puckSelector';
const { ccclass, property } = _decorator;

@ccclass('puckManager')
export class puckManager extends Component {

    @property({ type: SpriteFrame })
    Puck_Colors: SpriteFrame[] = [];

    
    start() {

    }

    changeColor = (name: puckColor) => {

        this.node.getComponent(Sprite).spriteFrame = this.Puck_Colors[name];

    }

    update(deltaTime: number) {

        let angularVelocity = this.node.getComponent(RigidBody2D).angularVelocity;
        if (angularVelocity != 0) {
            this.node.getComponent(RigidBody2D).angularVelocity = 0;
        }


    }
}

