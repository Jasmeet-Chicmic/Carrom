import { _decorator, Collider2D, Component, Enum, Node, Contact2DType, IPhysics2DContact, physics, NodePool, UITransform, Vec3, Vec2, tween, RigidBody2D } from 'cc';
import { colliderType } from './puckSelector';
const { ccclass, property } = _decorator;

@ccclass('collisionManager')
export class collisionManager extends Component {

    @property({ type: Node })
    blackHoles: Node[] = [];

    nodePool = null;
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
        if (blackBottomLeftCollider) { blackBottomLeftCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this); }
        if (blackTopRightCollider) {
            blackTopRightCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.name === "striker") {
            console.log("striker detected")



        } else if (otherCollider.node.name === "BLACK") {
            console.log("Black ");
            tween(otherCollider.node)
                .to(0.7, { position: otherCollider.node.getPosition() })
                .to(0.7, { scale: Vec3.ZERO })
                .call(() => {
                    otherCollider.node.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
                })
                .start();
            // otherCollider.node.scale = new Vec3(0, 0);


        } else if (otherCollider.node.name === "WHITE") {
            // console.log("White");
            tween(otherCollider.node)
                .to(0.7, { position: otherCollider.node.getPosition() })
                .to(0.7, { scale: Vec3.ZERO }).call(() => {
                    otherCollider.node.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
                })
                .start();



        } else {

            tween(otherCollider.node)
                .to(0.7, { position: otherCollider.node.getPosition() })
                .to(0.7, { scale: Vec3.ZERO }).call(() => {
                    otherCollider.node.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
                })
                .start();


        }





    }


    update(deltaTime: number) {

    }
}

