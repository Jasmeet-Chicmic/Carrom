import { _decorator, Component, Node, Sprite, SpriteFrame, Animation, UITransform, tween, director } from 'cc';
import resourceAllocator from './resourceManager'
const { ccclass, property } = _decorator;

@ccclass('carrom')
export class carrom extends Component {

    // GLOBAL ARRAY FOR STORING FETCHED SPRITEFRAMES
    spriteArr: SpriteFrame[];

    onLoad() {
        this.node.getChildByName('loading icon').active = false;
        this.node.getChildByName('loading icon- loader').active = false;
        director.preloadScene("CarromBoard");
        this.fetchResources();
    }

    async fetchResources() {

        this.node.getChildByName('loading icon').active = true;
        this.node.getChildByName('loading icon- loader').active = true;
        // this.node.getChildByName('loading icon- loader').getComponent(Animation).play();
        let loader = this.node.getChildByName('loading icon- loader');
        tween(loader).by(0.1, { angle: -13 }).repeatForever().start();
        this.spriteArr = await resourceAllocator.preLoadResources();
        this.fetchBackground();


        //USED setTimeout for checking the loading screen, will remove it 
        setTimeout(() => {
            this.fetchLogo()
            this.node.getChildByName('loading icon').active = false;
            this.node.getChildByName('loading icon- loader').active = false;
            director.loadScene("CarromBoard");


        }, 2000)

    }

    //FETCHING MAIN BACKGROUND
    fetchBackground() {
        let bg = this.spriteArr[resourceAllocator.assetIndex('bg')];
        this.node.getComponent(Sprite).spriteFrame = bg;

    }

    fetchLogo() {

        let rays = this.spriteArr[resourceAllocator.assetIndex('rays')];
        this.node.getChildByName('gameLogo').getChildByName('rays').getComponent(Sprite).spriteFrame = rays;
        console.log(rays);

        let rays_landingScreen = this.spriteArr[resourceAllocator.assetIndex('rays_landingScreen')];
        this.node.getChildByName('gameLogo').getChildByName("rays_landingScreen").getComponent(Sprite).spriteFrame = rays_landingScreen;
        console.log(rays_landingScreen);

        let logo = this.spriteArr[resourceAllocator.assetIndex('logo')];
        this.node.getChildByName('gameLogo').getChildByName('logo').getComponent(Sprite).spriteFrame = logo;
        let gameLogoSize = this.node.getChildByName('gameLogo').getComponent(UITransform).contentSize;
        let x = gameLogoSize.x;
        x = x - 200;
        let y = gameLogoSize.y;
        y = y - 200;
        this.node.getChildByName('gameLogo').getComponent(UITransform).setContentSize(x, y);

    }


    start() {

    }

    update(deltaTime: number) {

    }
}

