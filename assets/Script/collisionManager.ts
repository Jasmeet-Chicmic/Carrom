import { _decorator, Collider2D, Component, Enum, Node, Contact2DType, IPhysics2DContact, physics, NodePool, UITransform, Vec3, Vec2, tween, RigidBody2D, sys, Label, Prefab, instantiate } from 'cc';
import { colliderType } from './puckSelector';
import { puckColor } from './puckSelector';
import { puckManager } from './puckManager';
import { Player } from './Player';
const { ccclass, property } = _decorator;

@ccclass('collisionManager')
export class collisionManager extends Component {

    @property({ type: Node })
    blackHoles: Node[] = [];

    @property({ type: Node })
    ScoreLabel = null;

    @property({ type: Prefab })
    Puck = null;


    black_count = 0;
    white_count = 0;
    red = 0;
    prevScore = 0;

    onLoad() {

    }
    start() {
        var blackTopRightCollider = this.blackHoles[0].getComponent(Collider2D);
        var blackBottomLeftCollider = this.blackHoles[2].getComponent(Collider2D);
        var blackBottomRightCollider = this.blackHoles[1].getComponent(Collider2D);
        var blackTopLeftCollider = this.blackHoles[3].getComponent(Collider2D);

        if (blackTopLeftCollider) {
            blackTopLeftCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        if (blackBottomRightCollider) {
            blackBottomRightCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        if (blackBottomLeftCollider) {
            blackBottomLeftCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        if (blackTopRightCollider) {
            blackTopRightCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.name === "striker") {
            otherCollider.node.setScale(0, 0);
            otherCollider.node.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0)
            console.log(otherCollider.node.scale);
            if (this.black_count > 0) {
                this.black_count--;
            }




        } else if (otherCollider.node.name === "BLACK") {
            console.log("Black ");

            this.black_count++;


            tween(otherCollider.node)
                .to(0.7, { position: otherCollider.node.getPosition() })
                .to(0.7, { scale: Vec3.ZERO })
                .call(() => {
                    otherCollider.node.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
                })
                .start();
            setTimeout(() => {
                otherCollider.node.destroy();
            }, 10)


        } else if (otherCollider.node.name === "WHITE") {
            // console.log("White");

            this.white_count++;
            tween(otherCollider.node)
                .to(0.7, { position: otherCollider.node.getPosition() })
                .to(0.7, { scale: Vec3.ZERO }).call(() => {
                    otherCollider.node.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
                })
                .start();

            setTimeout(() => {
                otherCollider.node.destroy();
            }, 10)
            // setTimeout(() => {
            //     selfCollider.enabled = false;
            //     selfCollider.getComponent(RigidBody2D).destroy();
            //     // otherCollider.enabled = false;
            //     // otherCollider.getComponent(RigidBody2D).destroy();

            // });




        } else {
            this.red++;
            tween(otherCollider.node)
                .to(0.7, { position: otherCollider.node.getPosition() })
                .to(0.7, { scale: Vec3.ZERO }).call(() => {
                    otherCollider.node.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
                })
                .start();
            setTimeout(() => {
                otherCollider.node.destroy();
            }, 10)
            // setTimeout(() => {



            //     selfCollider.enabled = false;
            //     selfCollider.getComponent(RigidBody2D).destroy();
            //     // otherCollider.enabled = false;
            //     // otherCollider.getComponent(RigidBody2D).destroy();

            // });


        }



        sys.localStorage.setItem("BlackCount", String(this.black_count));
        sys.localStorage.setItem("WhiteCount", String(this.white_count));

        let score = this.black_count * 10 + this.white_count * 20 + this.red * 50
        this.prevScore = score;
        sys.localStorage.setItem("TotalScore", String(score))
        this.updateScore();

    }

    updateScore() {

        this.ScoreLabel.getComponent(Label).string = sys.localStorage.getItem("TotalScore");
    }

    update(deltaTime: number) {

    }
}

