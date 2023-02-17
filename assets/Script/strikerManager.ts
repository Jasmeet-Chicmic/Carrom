import { BoxCollider2D, CircleCollider2D, Vec2 } from 'cc';
import { _decorator, Component, Input, Node, RigidBody, RigidBody2D, Vec3, PhysicsSystem2D, EPhysics2DDrawFlags } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('strikerManager')
export class strikerManager extends Component {
    @property({ type: Node })
    TargetArea: Node = null;

    angularVelocityCheck = 0;
    cursorStartPos = null;
    cursorEndPos = null;
    yDifference = null;
    xDifference = null;
    angle = null;
    onLoad() {
        this.node.name = "striker";
        this.node.on(Input.EventType.TOUCH_START, this.cursorPosition, this)
        this.node.on(Input.EventType.TOUCH_MOVE, this.cursorPosition, this);
        this.node.on(Input.EventType.TOUCH_CANCEL, this.cursorPosition, this);
        PhysicsSystem2D.instance.enable = true;
        // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.All;
    }

    euclideanDistance() {
        return Math.sqrt(Math.pow(this.xDifference, 2) + Math.pow(this.yDifference, 2))
    }
    cursorPosition(event) {

        if (event.type == 'touch-start') {
            this.cursorStartPos = event.getUILocation();


        } else if (event.type == 'touch-move') {
            this.cursorEndPos = event.getUILocation();
            // console.log(event.);
            this.yDifference = this.cursorEndPos.y - this.cursorStartPos.y;
            this.xDifference = this.cursorEndPos.x - this.cursorStartPos.x;
            this.angle = Math.atan2(this.yDifference, this.xDifference) * 180 / Math.PI + 90;
            // console.log();


        } else if (event.type == "touch-cancel") {
            this.TargetArea.setScale(0, 0);
            this.node.getComponent(RigidBody2D).linearVelocity = new Vec2(-this.xDifference, -this.yDifference);
            this.node.getChildByName('hover_rotating').active = false;
            this.node.getChildByName('hover_green').active = false;
            this.TargetArea.getChildByName('target_area').active = false;
            this.TargetArea.getChildByName('target_arrow').active = false;
            this.TargetArea.getChildByName('front_direction').active = false;

            if (this.node.getComponent(RigidBody2D).angularVelocity == 0) {
                this.angularVelocityCheck = 0;
            } else {
                this.angularVelocityCheck = 1;
            }


        }
        if (this.cursorEndPos != null && this.cursorStartPos != null) {
            this.yDifference = this.cursorEndPos.y - this.cursorStartPos.y;
            this.xDifference = this.cursorEndPos.x - this.cursorStartPos.x;
            let distance = this.euclideanDistance();

            if (distance * 0.007 < 1 && distance * 0.007 > -1) {
                this.TargetArea.setScale(distance * 0.007, distance * 0.007)

                this.TargetArea.getChildByName('target_area').setScale(distance * 0.007, distance * 0.007)

            }



            this.TargetArea.angle = this.angle;


        }



    }


    start() {

    }

    update(deltaTime: number) {
        // if (this.node.getComponent(RigidBody2D).linearVelocity.x == 0 && this.node.getComponent(RigidBody2D).linearVelocity.y == 0) {
        //     this.node.setPosition(-348.94, -461.517);
        // }
    }
}

