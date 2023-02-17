import { _decorator, Component, instantiate, JsonAsset, Node, Prefab, Sprite, SpriteFrame, UITransform, Vec3 } from 'cc';
import { puckManager } from './puckManager';
import { puckColor } from './puckSelector';

const { ccclass, property } = _decorator;

@ccclass('board')
export class board extends Component {


    @property({ type: Prefab })
    puck: Prefab = null;

    @property({ type: JsonAsset })
    Puck_Data = null;

    pucksData = null;
    start() {

        this.pucksData = this.Puck_Data.json.data;
        this.pucksPattern();
        console.log(this.node.children);


    }

    newGenLoad() {
        let puckInstance = instantiate(this.puck);
        puckInstance.getComponent(puckManager).changeColor(puckColor.BLACK)
        return puckInstance;
    }
    pucksPattern() {
        let row = 5;
        let totalPucks = 19;
        let temp = null;
        let count = 0;
        let startpos: Vec3 = new Vec3(-83.087, 162.543);
        let pos = startpos.x;
        temp = this.newGenLoad();
        let puckWidth = temp.getComponent(UITransform).width;
        let puckHeight = temp.getComponent(UITransform).height;
        for (let i = 0; i < row; i++) {
            let m = row - Math.abs(2 - i);
            for (let j = 0; j < m; j++) {
                count++;
                console.log();

                temp = this.newGenLoad();

                if (count == this.pucksData[count - 1].id) {
                    if (this.pucksData[count - 1].color == "BLACK") {
                        temp.name = "BLACK";
                        temp.getComponent(puckManager).changeColor(puckColor.BLACK);
                    }
                    else if (this.pucksData[count - 1].color == "WHITE") {
                        temp.name = "WHITE";
                        temp.getComponent(puckManager).changeColor(puckColor.WHITE);
                    } else {
                        temp.name = "RED";
                        temp.getComponent(puckManager).changeColor(puckColor.RED);
                    }
                }






                this.node.addChild(temp);
                temp.setPosition(startpos);
                startpos.x = startpos.x + puckWidth;
            }

            startpos.y = startpos.y - puckHeight;
            startpos.x = pos;
            // console.log(pos);


            if (i < Math.floor(row / 2)) {
                startpos.x = startpos.x - puckWidth * 0.5;
            } else {
                startpos.x = startpos.x + puckWidth * 0.5;
            }
            pos = startpos.x;
        }
    }







    update(deltaTime: number) {

    }
}

