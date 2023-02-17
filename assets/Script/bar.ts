import { _decorator, Color, Component, input, Input, Node, RigidBody2D, Slider, Sprite, tween, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bar')
export class bar extends Component {

    @property({ type: Node })
    striker: Node = null;

    @property({ type: Node })
    hover_green = null;

    @property({ type: Node })
    hover_rotating = null;
    @property({ type: Node })
    target_area: Node = null;

    striker_initial_y = 0;
    initial_Postion = -348.94;
    width_progess = 700;
    onLoad() {
        this.node.on('slide', this.handleStriker);
        this.node.getChildByName('Handle').on(Input.EventType.TOUCH_START, this.handleStrikerGreenHover)
        this.node.getChildByName('Handle').on(Input.EventType.TOUCH_END, this.handleStrikerGreenHover)
        this.striker_initial_y = this.striker.getPosition().y;
    }

    handleStrikerGreenHover = (event) => {
        if (event.type == "touch-start") {
            tween(this.hover_rotating).by(1, { angle: -360 }).repeatForever().start();
            this.striker.getComponent(RigidBody2D).angularVelocity = 0;
            this.striker.getChildByName('hover_rotating').active = true;
            this.striker.getChildByName('hover_green').active = true;
            this.target_area.getChildByName('target_area').active = true;
            this.target_area.getChildByName('target_arrow').active = true;
            this.target_area.getChildByName('front_direction').active = true;
            this.striker.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
            this.striker.angle = 0;
            this.hover_green.setScale(1.5, 1.5);
        } else {
            this.hover_green.setScale(1, 1);
        }


    }
    handleStriker = () => {
        let progress = this.node.getComponent(Slider).progress;
        progress = progress * this.width_progess;
        // this.hover_green.setPosition(new Vec3(this.initial_Postion + progress, this.striker_initial_y, 0))
        this.striker.setPosition(new Vec3(this.initial_Postion + progress, this.striker_initial_y, 0))
        // this.hover_rotating.setPosition(new Vec3(this.initial_Postion + progress, this.striker_initial_y, 0))

    }
    start() {

    }

    update(deltaTime: number) {

    }
}

